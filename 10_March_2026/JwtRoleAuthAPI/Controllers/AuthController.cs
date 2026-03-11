using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtRoleAuthAPI.Data;
using JwtRoleAuthAPI.Models;

namespace JwtRoleAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ================= REGISTER =================
        [HttpPost("register")]
        public IActionResult Register(User newUser)
        {
            // check if username already exists
            var existingUser = _context.Users
                .FirstOrDefault(u => u.Username == newUser.Username);

            if (existingUser != null)
            {
                return BadRequest("Username already exists");
            }

            // add user to database
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new
            {
                message = "User registered successfully",
                username = newUser.Username,
                role = newUser.Role
            });
        }


        // ================= LOGIN =================
        [HttpPost("login")]
        public IActionResult Login(User loginUser)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Username == loginUser.Username 
                                  && u.Password == loginUser.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                token = token,
                username = user.Username,
                role = user.Role
            });
        }


        // ================= JWT TOKEN =================
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}