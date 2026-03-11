using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        // This endpoint is protected and can only be accessed by users with the "Manager" role

        [HttpGet("dashboard")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetManagerDashboard()
        {
            return Ok("Welcome to the Manager Dashboard! Only users with the Admin role can see this.");
        }
        [HttpGet("reports")]
        [Authorize(Roles = " Admin,Manager")]
        public IActionResult GetManagerReports()
        {
            return Ok("Welcome to the Manager And Admin Reports! Both Admin and Manager with the Admin role can see this.");
        }
    }
}