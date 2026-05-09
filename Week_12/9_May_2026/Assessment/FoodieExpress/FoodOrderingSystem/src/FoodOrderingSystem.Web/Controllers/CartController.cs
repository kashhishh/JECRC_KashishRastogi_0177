using FoodOrderingSystem.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.Web.Controllers;

[Authorize]
public class CartController : Controller
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private string UserId =>
        User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "";

    public async Task<IActionResult> Index()
    {
        var cart = await _cartService.GetCartAsync(UserId);
        return View(cart);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddToCart(int foodItemId, int quantity = 1)
    {
        await _cartService.AddToCartAsync(UserId, foodItemId, quantity);
        TempData["Success"] = "Item added to cart!";
        return RedirectToAction("Index", "Food");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateQuantity(int cartItemId, int quantity)
    {
        await _cartService.UpdateCartItemAsync(UserId, cartItemId, quantity);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> RemoveItem(int cartItemId)
    {
        await _cartService.RemoveFromCartAsync(UserId, cartItemId);
        TempData["Success"] = "Item removed from cart.";
        return RedirectToAction(nameof(Index));
    }
}
