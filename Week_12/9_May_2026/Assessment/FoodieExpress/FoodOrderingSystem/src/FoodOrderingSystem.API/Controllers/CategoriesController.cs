using FoodOrderingSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoriesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _unitOfWork.Categories.GetActiveAsync();
        return Ok(categories.Select(c => new
        {
            c.Id,
            c.Name,
            c.Description
        }));
    }
}
