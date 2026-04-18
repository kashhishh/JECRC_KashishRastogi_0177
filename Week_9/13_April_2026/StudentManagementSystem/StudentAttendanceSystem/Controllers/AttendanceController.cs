using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAttendanceSystem.Data;
using StudentAttendanceSystem.Model;

namespace StudentAttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceDbContext _context;

        public AttendanceController(AttendanceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _context.Attendances.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var record = await _context.Attendances.FindAsync(id);
            if (record == null) return NotFound();
            return Ok(record);
        }

        // GET by StudentId: api/Attendance/student/3
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetByStudent(int studentId)
        {
            var records = await _context.Attendances
                .Where(a => a.StudentId == studentId)
                .ToListAsync();
            return Ok(records);
        }

        [HttpPost]
        public async Task<IActionResult> Mark(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = attendance.Id }, attendance);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Attendance attendance)
        {
            if (id != attendance.Id) return BadRequest();
            _context.Entry(attendance).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var record = await _context.Attendances.FindAsync(id);
            if (record == null) return NotFound();
            _context.Attendances.Remove(record);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}