using Microsoft.AspNetCore.Mvc;

namespace EMPSystem.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
