using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Enums;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Infrastructure.Services;
using FoodOrderingSystem.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FoodOrderingSystem.Web.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IOrderService _orderService;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public AdminController(IUnitOfWork unitOfWork, IOrderService orderService, IWebHostEnvironment webHostEnvironment)
    {
        _unitOfWork = unitOfWork;
        _orderService = orderService;
        _webHostEnvironment = webHostEnvironment;
    }

    public IActionResult Index() => View();

    // ───── Food Items ─────
    public async Task<IActionResult> FoodItems()
    {
        var items = await _unitOfWork.FoodItems.GetAllAsync();
        return View(items);
    }

    [HttpGet]
    public async Task<IActionResult> CreateFoodItem()
    {
        await PopulateCategoriesAsync();
        return View(new FoodItemWebViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateFoodItem(FoodItemWebViewModel model)
    {
        if (!ModelState.IsValid)
        {
            await PopulateCategoriesAsync();
            return View(model);
        }

        var imagePath = await SaveImageAsync(model.ImageFile);

        var foodItem = new FoodItem
        {
            Name = model.Name,
            Description = model.Description,
            Price = model.Price,
            CategoryId = model.CategoryId,
            IsAvailable = model.IsAvailable,
            ImagePath = imagePath
        };

        await _unitOfWork.FoodItems.AddAsync(foodItem);
        await _unitOfWork.SaveChangesAsync();

        TempData["Success"] = "Food item created successfully.";
        return RedirectToAction(nameof(FoodItems));
    }

    [HttpGet]
    public async Task<IActionResult> EditFoodItem(int id)
    {
        var item = await _unitOfWork.FoodItems.GetWithCategoryAsync(id);
        if (item == null) return NotFound();

        await PopulateCategoriesAsync();
        return View(new FoodItemWebViewModel
        {
            Id = item.Id,
            Name = item.Name,
            Description = item.Description,
            Price = item.Price,
            CategoryId = item.CategoryId,
            IsAvailable = item.IsAvailable,
            ExistingImagePath = item.ImagePath
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditFoodItem(FoodItemWebViewModel model)
    {
        ModelState.Remove("ImageFile");
        if (!ModelState.IsValid)
        {
            await PopulateCategoriesAsync();
            return View(model);
        }

        var item = await _unitOfWork.FoodItems.GetByIdAsync(model.Id);
        if (item == null) return NotFound();

        item.Name = model.Name;
        item.Description = model.Description;
        item.Price = model.Price;
        item.CategoryId = model.CategoryId;
        item.IsAvailable = model.IsAvailable;
        item.UpdatedAt = DateTime.UtcNow;

        if (model.ImageFile != null)
            item.ImagePath = await SaveImageAsync(model.ImageFile);

        _unitOfWork.FoodItems.Update(item);
        await _unitOfWork.SaveChangesAsync();

        TempData["Success"] = "Food item updated successfully.";
        return RedirectToAction(nameof(FoodItems));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteFoodItem(int id)
    {
        var item = await _unitOfWork.FoodItems.GetByIdAsync(id);
        if (item == null) return NotFound();

        _unitOfWork.FoodItems.Remove(item);
        await _unitOfWork.SaveChangesAsync();

        TempData["Success"] = "Food item deleted successfully.";
        return RedirectToAction(nameof(FoodItems));
    }

    // ───── Categories ─────
    public async Task<IActionResult> Categories()
    {
        var categories = await _unitOfWork.Categories.GetAllAsync();
        return View(categories);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> CreateCategory(string name, string? description)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            TempData["Error"] = "Category name is required.";
            return RedirectToAction(nameof(Categories));
        }

        await _unitOfWork.Categories.AddAsync(new Category { Name = name, Description = description });
        await _unitOfWork.SaveChangesAsync();
        TempData["Success"] = "Category created.";
        return RedirectToAction(nameof(Categories));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var cat = await _unitOfWork.Categories.GetByIdAsync(id);
        if (cat != null)
        {
            _unitOfWork.Categories.Remove(cat);
            await _unitOfWork.SaveChangesAsync();
            TempData["Success"] = "Category deleted.";
        }
        return RedirectToAction(nameof(Categories));
    }

    // ───── Orders ─────
    public async Task<IActionResult> Orders()
    {
        var orders = await _orderService.GetAllOrdersAsync();
        return View(orders);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, OrderStatus status)
    {
        await _orderService.UpdateOrderStatusAsync(orderId, status);
        TempData["Success"] = "Order status updated.";
        return RedirectToAction(nameof(Orders));
    }

    // ───── Helpers ─────
    private async Task PopulateCategoriesAsync()
    {
        var categories = await _unitOfWork.Categories.GetActiveAsync();
        ViewBag.Categories = new SelectList(categories, "Id", "Name");
    }

    private async Task<string?> SaveImageAsync(IFormFile? imageFile)
    {
        if (imageFile == null || imageFile.Length == 0) return null;

        var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images", "food");
        Directory.CreateDirectory(uploadsFolder);

        var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using var fileStream = new FileStream(filePath, FileMode.Create);
        await imageFile.CopyToAsync(fileStream);

        return $"/images/food/{uniqueFileName}";
    }
}
