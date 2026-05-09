using FoodOrderingSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodItemsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public FoodItemsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _unitOfWork.FoodItems.GetAvailableItemsAsync();
        return Ok(items.Select(f => new
        {
            f.Id,
            f.Name,
            f.Description,
            f.Price,
            f.ImagePath,
            f.IsAvailable,
            Category = f.Category?.Name
        }));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _unitOfWork.FoodItems.GetWithCategoryAsync(id);
        if (item == null) return NotFound();
        return Ok(new
        {
            item.Id,
            item.Name,
            item.Description,
            item.Price,
            item.ImagePath,
            item.IsAvailable,
            Category = item.Category?.Name
        });
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string term)
    {
        if (string.IsNullOrWhiteSpace(term)) return BadRequest("Search term is required.");
        var items = await _unitOfWork.FoodItems.SearchAsync(term);
        return Ok(items.Select(f => new
        {
            f.Id,
            f.Name,
            f.Description,
            f.Price,
            f.ImagePath,
            Category = f.Category?.Name
        }));
    }

    [HttpGet("category/{categoryId:int}")]
    public async Task<IActionResult> GetByCategory(int categoryId)
    {
        var items = await _unitOfWork.FoodItems.GetByCategoryAsync(categoryId);
        return Ok(items.Select(f => new
        {
            f.Id,
            f.Name,
            f.Description,
            f.Price,
            f.ImagePath
        }));
    }
}
