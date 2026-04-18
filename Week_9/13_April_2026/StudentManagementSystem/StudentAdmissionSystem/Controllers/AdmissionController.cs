using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAdmissionSystem.Data;
using StudentAdmissionSystem.Model;

namespace StudentAdmissionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private readonly AdmissionDbContext _context;
        private readonly ILogger<AdmissionController> _logger;

        public AdmissionController(AdmissionDbContext context, ILogger<AdmissionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Admission
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var admissions = await _context.Admissions.ToListAsync();
            return Ok(admissions);
        }

        // GET: api/Admission/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var admission = await _context.Admissions.FindAsync(id);
            if (admission == null) return NotFound();
            return Ok(admission);
        }

        // POST: api/Admission
        [HttpPost]
        public async Task<IActionResult> Create(Admission admission)
        {
            try
            {
                _logger.LogInformation("Creating admission for student: {StudentName}", admission.StudentName);
                _context.Admissions.Add(admission);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Admission created with ID: {Id}", admission.Id);
                return CreatedAtAction(nameof(GetById), new { id = admission.Id }, admission);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating admission");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/Admission/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Admission admission)
        {
            if (id != admission.Id) return BadRequest();
            _context.Entry(admission).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Admission/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var admission = await _context.Admissions.FindAsync(id);
            if (admission == null) return NotFound();
            _context.Admissions.Remove(admission);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PATCH: api/Admission/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var admission = await _context.Admissions.FindAsync(id);
            if (admission == null) return NotFound();
            admission.Status = status;
            await _context.SaveChangesAsync();
            return Ok(admission);
        }
    }
}