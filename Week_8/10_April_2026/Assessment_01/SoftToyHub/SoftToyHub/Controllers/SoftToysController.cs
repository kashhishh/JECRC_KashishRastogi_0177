using Microsoft.AspNetCore.Mvc;
using SoftToyHub.Data;
using SoftToyHub.DTOs;
using SoftToyHub.Data;
using SoftToyHub.DTOs;
using SoftToyHub.Entities;

namespace SoftToyHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoftToysController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<SoftToyResponseDto>> GetAll()
        {
            var toys = SoftToyStore.Toys.Select(t => new SoftToyResponseDto
            {
                Id = t.Id,
                Name = t.Name,
                Price = t.Price,
                Category = t.Category,
                IsAvailable = t.IsAvailable
            });

            return Ok(toys);
        }

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var toy = SoftToyStore.Toys.FirstOrDefault(t => t.Id == id);

            if (toy == null)
                return NotFound();

            return Ok(toy);
        }

        [HttpPost]
        public ActionResult Create(CreateSoftToyDto dto)
        {
            var newToy = new SoftToy
            {
                Id = SoftToyStore.Toys.Any() ? SoftToyStore.Toys.Max(t => t.Id) + 1 : 1,
                Name = dto.Name,
                Price = dto.Price,
                Category = dto.Category,
                Stock = dto.Stock,
                IsAvailable = dto.IsAvailable
            };

            SoftToyStore.Toys.Add(newToy);
            return Ok(newToy);
            
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, UpdateSoftToyDto dto)
        {
            var toy = SoftToyStore.Toys.FirstOrDefault(t => t.Id == id);

            if (toy == null)
                return NotFound();

            toy.Name = dto.Name;
            toy.Price = dto.Price;
            toy.Category = dto.Category;
            toy.UpdateStock(dto.Stock);

            return Ok(toy);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var toy = SoftToyStore.Toys.FirstOrDefault(t => t.Id == id);

            if (toy == null)
                return NotFound();

            SoftToyStore.Toys.Remove(toy);
            return Ok("Deleted");
        }
    }
}