using EMSWebAPI.Data;
using EMSWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMSWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Employees.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var emp = _context.Employees.Find(id);
            if (emp == null) return NotFound();
            return Ok(emp);
        }

        [HttpPost]
        public IActionResult Create(Employee emp)
        {
            _context.Employees.Add(emp);
            _context.SaveChanges();
            return Ok(emp);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee emp)
        {
            var existing = _context.Employees.Find(id);
            if (existing == null) return NotFound();

            existing.Name = emp.Name;
            existing.Department = emp.Department;
            existing.Email = emp.Email;
            existing.Salary = emp.Salary;

            _context.SaveChanges();

            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var emp = _context.Employees.Find(id);
            if (emp == null) return NotFound();

            _context.Employees.Remove(emp);
            _context.SaveChanges();

            return Ok();
        }
    }
}