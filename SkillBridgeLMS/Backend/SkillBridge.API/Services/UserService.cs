using Microsoft.EntityFrameworkCore;
using SkillBridge.API.Data;
using SkillBridge.API.DTOs;
using SkillBridge.API.Models;

namespace SkillBridge.API.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _db;

        public UserService(AppDbContext db)
        {
            _db = db;
        }

        private static UserResponseDto MapToDto(User u) => new()
        {
            UserId       = u.UserId,
            FullName     = u.FullName,
            Email        = u.Email,
            Role         = u.Role?.RoleName ?? "",
            Department   = u.Department?.DepartmentName,
            IsActive     = u.IsActive,
            ProfilePicUrl = u.ProfilePicUrl,
            CreatedAt    = u.CreatedAt
        };

        public async Task<UserResponseDto?> CreateUserAsync(CreateUserDto dto)
        {
            bool exists = await _db.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists) return null;

            var user = new User
            {
                FullName     = dto.FullName,
                Email        = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                RoleId       = dto.RoleId,
                DepartmentId = dto.DepartmentId,
                IsActive     = true
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return await GetUserByIdAsync(user.UserId);
        }

        public async Task<PagedResult<UserResponseDto>> GetAllUsersAsync(
            int page, int pageSize, string? search, int? roleId)
        {
            var query = _db.Users
                .Include(u => u.Role)
                .Include(u => u.Department)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(u =>
                    u.FullName.Contains(search) ||
                    u.Email.Contains(search));

            if (roleId.HasValue)
                query = query.Where(u => u.RoleId == roleId.Value);

            var total = await query.CountAsync();

            var users = await query
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<UserResponseDto>
            {
                Data       = users.Select(MapToDto).ToList(),
                TotalCount = total,
                Page       = page,
                PageSize   = pageSize
            };
        }

        public async Task<UserResponseDto?> GetUserByIdAsync(int id)
        {
            var user = await _db.Users
                .Include(u => u.Role)
                .Include(u => u.Department)
                .FirstOrDefaultAsync(u => u.UserId == id);

            return user == null ? null : MapToDto(user);
        }

        public async Task<bool> UpdateUserStatusAsync(
            int id, bool isActive, int adminId)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return false;

            user.IsActive = isActive;

            _db.AuditLogs.Add(new AuditLog
            {
                UserId   = adminId,
                Action   = isActive ? "ACTIVATE_USER" : "DEACTIVATE_USER",
                Entity   = "User",
                NewValue = $"UserId={id} IsActive={isActive}"
            });

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ResetPasswordAsync(
            int id, string newPassword, int adminId)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);

            _db.AuditLogs.Add(new AuditLog
            {
                UserId   = adminId,
                Action   = "RESET_PASSWORD",
                Entity   = "User",
                NewValue = $"Password reset for UserId={id}"
            });

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<UserResponseDto?> UpdateProfileAsync(
            int id, UpdateProfileDto dto)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return null;

            user.FullName     = dto.FullName;
            user.DepartmentId = dto.DepartmentId;

            await _db.SaveChangesAsync();
            return await GetUserByIdAsync(id);
        }

        public async Task<bool> ChangeRoleAsync(
            int id, int newRoleId, int adminId)
        {
            if (id == adminId) return false;

            var user = await _db.Users.FindAsync(id);
            if (user == null) return false;

            var oldRole  = user.RoleId.ToString();
            user.RoleId  = newRoleId;

            // Revoke all refresh tokens → force re-login
            var tokens = _db.RefreshTokens.Where(rt => rt.UserId == id);
            foreach (var t in tokens) t.IsRevoked = true;

            _db.AuditLogs.Add(new AuditLog
            {
                UserId   = adminId,
                Action   = "CHANGE_ROLE",
                Entity   = "User",
                OldValue = $"RoleId={oldRole}",
                NewValue = $"RoleId={newRoleId}"
            });

            await _db.SaveChangesAsync();
            return true;
        }
    }
}