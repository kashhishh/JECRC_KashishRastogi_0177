using FoodOrderingSystem.Core.ViewModels;
using FoodOrderingSystem.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.Web.Controllers;

[Authorize]
public class OrderController : Controller
{
    private readonly IOrderService _orderService;
    private readonly ICartService _cartService;

    public OrderController(IOrderService orderService, ICartService cartService)
    {
        _orderService = orderService;
        _cartService = cartService;
    }

    private string UserId =>
        User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "";

    [HttpGet]
    public async Task<IActionResult> Checkout()
    {
        var cart = await _cartService.GetCartAsync(UserId);
        if (!cart.Items.Any())
        {
            TempData["Error"] = "Your cart is empty.";
            return RedirectToAction("Index", "Cart");
        }

        var model = new CheckoutViewModel
        {
            CartItems = cart.Items,
            TotalAmount = cart.TotalAmount
        };
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Checkout(CheckoutViewModel model)
    {
        if (!ModelState.IsValid)
        {
            var cart = await _cartService.GetCartAsync(UserId);
            model.CartItems = cart.Items;
            model.TotalAmount = cart.TotalAmount;
            return View(model);
        }

        try
        {
            var orderId = await _orderService.PlaceOrderAsync(UserId, model.DeliveryAddress, model.Notes);
            TempData["Success"] = $"Order #{orderId} placed successfully!";
            return RedirectToAction(nameof(Confirmation), new { id = orderId });
        }
        catch (Exception ex)
        {
            ModelState.AddModelError(string.Empty, ex.Message);
            return View(model);
        }
    }

    public async Task<IActionResult> Confirmation(int id)
    {
        var order = await _orderService.GetOrderDetailsAsync(id);
        if (order == null) return NotFound();
        return View(order);
    }

    public async Task<IActionResult> History()
    {
        var orders = await _orderService.GetUserOrdersAsync(UserId);
        return View(orders);
    }

    public async Task<IActionResult> Invoice(int id)
    {
        var order = await _orderService.GetOrderDetailsAsync(id);
        if (order == null) return NotFound();
        return View(order);
    }
}
