using SkillBridge.API.DTOs;

namespace SkillBridge.API.Services
{
    public interface IUserService
    {
        Task<UserResponseDto?> CreateUserAsync(CreateUserDto dto);
        Task<PagedResult<UserResponseDto>> GetAllUsersAsync(
            int page, int pageSize, string? search, int? roleId);
        Task<UserResponseDto?> GetUserByIdAsync(int id);
        Task<bool> UpdateUserStatusAsync(int id, bool isActive, int adminId);
        Task<bool> ResetPasswordAsync(int id, string newPassword, int adminId);
        Task<UserResponseDto?> UpdateProfileAsync(int id, UpdateProfileDto dto);
        Task<bool> ChangeRoleAsync(int id, int newRoleId, int adminId);
    }
}