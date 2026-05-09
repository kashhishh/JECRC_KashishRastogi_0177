using FoodOrderingSystem.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.Web.Controllers;

public class HomeController : Controller
{
    private readonly IUnitOfWork _unitOfWork;

    public HomeController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IActionResult> Index()
    {
        var categories = await _unitOfWork.Categories.GetActiveAsync();
        var featuredItems = (await _unitOfWork.FoodItems.GetAvailableItemsAsync()).Take(6);
        ViewBag.Categories = categories;
        ViewBag.FeaturedItems = featuredItems;
        return View();
    }

    public IActionResult Privacy() => View();
}
