using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeAPI.Data;
using EmployeeAPI.Models;
using EmployeeAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public EmployeesController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Employees.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            return emp == null ? NotFound() : Ok(emp);
        }

        [HttpPost]
        public async Task<IActionResult> Create(EmployeeDto dto)
        {
            var emp = new Employee
            {
                Name = dto.Name, Email = dto.Email,
                Department = dto.Department, Role = dto.Role,
                Salary = dto.Salary, Status = dto.Status
            };
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = emp.Id }, emp);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EmployeeDto dto)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return NotFound();
            emp.Name = dto.Name; emp.Email = dto.Email;
            emp.Department = dto.Department; emp.Role = dto.Role;
            emp.Salary = dto.Salary; emp.Status = dto.Status;
            await _context.SaveChangesAsync();
            return Ok(emp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return NotFound();
            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}