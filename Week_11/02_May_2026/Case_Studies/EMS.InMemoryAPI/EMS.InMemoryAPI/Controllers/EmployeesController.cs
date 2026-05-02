using EMS.InMemoryAPI.Models;
using EMS.InMemoryAPI.Repositories;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EMSInMemoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = EmployeeRepository.GetAll();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var employee = EmployeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            EmployeeRepository.Add(employee);
            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            var existingEmployee = EmployeeRepository.GetById(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            EmployeeRepository.Update(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = EmployeeRepository.GetById(id);
            if (existing == null)
            {
                return NotFound();
            }

            EmployeeRepository.Delete(id); // returns void
            return NoContent();
        }
    }
}