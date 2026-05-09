using FoodOrderingSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.Web.Controllers;

public class FoodController : Controller
{
    private readonly IUnitOfWork _unitOfWork;

    public FoodController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IActionResult> Index(int? categoryId, string? search)
    {
        var categories = await _unitOfWork.Categories.GetActiveAsync();
        ViewBag.Categories = categories;
        ViewBag.SelectedCategory = categoryId;
        ViewBag.SearchTerm = search;

        IEnumerable<Core.Entities.FoodItem> items;

        if (!string.IsNullOrWhiteSpace(search))
            items = await _unitOfWork.FoodItems.SearchAsync(search);
        else if (categoryId.HasValue)
            items = await _unitOfWork.FoodItems.GetByCategoryAsync(categoryId.Value);
        else
            items = await _unitOfWork.FoodItems.GetAvailableItemsAsync();

        return View(items);
    }

    public async Task<IActionResult> Details(int id)
    {
        var item = await _unitOfWork.FoodItems.GetWithCategoryAsync(id);
        if (item == null) return NotFound();
        return View(item);
    }
}
