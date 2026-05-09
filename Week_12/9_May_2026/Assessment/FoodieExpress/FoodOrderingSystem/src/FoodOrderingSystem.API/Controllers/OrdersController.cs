using FoodOrderingSystem.Core.Enums;
using FoodOrderingSystem.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrderingSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _orderService.GetAllOrdersAsync();
        return Ok(orders);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await _orderService.GetOrderDetailsAsync(id);
        if (order == null) return NotFound();
        return Ok(order);
    }

    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] OrderStatus status)
    {
        await _orderService.UpdateOrderStatusAsync(id, status);
        return NoContent();
    }
}
