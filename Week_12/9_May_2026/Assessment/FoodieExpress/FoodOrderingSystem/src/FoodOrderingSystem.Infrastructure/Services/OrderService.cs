using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Enums;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Core.ViewModels;

namespace FoodOrderingSystem.Infrastructure.Services;

public interface IOrderService
{
    Task<int> PlaceOrderAsync(string userId, string deliveryAddress, string? notes);
    Task<IEnumerable<OrderViewModel>> GetUserOrdersAsync(string userId);
    Task<OrderViewModel?> GetOrderDetailsAsync(int orderId);
    Task<IEnumerable<OrderViewModel>> GetAllOrdersAsync();
    Task UpdateOrderStatusAsync(int orderId, OrderStatus status);
}

public class OrderService : IOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICartService _cartService;
    private readonly IEmailService _emailService;

    public OrderService(IUnitOfWork unitOfWork, ICartService cartService, IEmailService emailService)
    {
        _unitOfWork = unitOfWork;
        _cartService = cartService;
        _emailService = emailService;
    }

    public async Task<int> PlaceOrderAsync(string userId, string deliveryAddress, string? notes)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        if (cart == null || !cart.CartItems.Any())
            throw new InvalidOperationException("Cart is empty.");

        var order = new Order
        {
            UserId = userId,
            DeliveryAddress = deliveryAddress,
            Notes = notes,
            TotalAmount = cart.CartItems.Sum(ci => ci.FoodItem.Price * ci.Quantity),
            Status = OrderStatus.Pending,
            OrderedAt = DateTime.UtcNow
        };

        foreach (var item in cart.CartItems)
        {
            order.OrderItems.Add(new OrderItem
            {
                FoodItemId = item.FoodItemId,
                Quantity = item.Quantity,
                UnitPrice = item.FoodItem.Price
            });
        }

        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        await _cartService.ClearCartAsync(userId);

        return order.Id;
    }

    public async Task<IEnumerable<OrderViewModel>> GetUserOrdersAsync(string userId)
    {
        var orders = await _unitOfWork.Orders.GetUserOrdersAsync(userId);
        return orders.Select(MapToViewModel);
    }

    public async Task<OrderViewModel?> GetOrderDetailsAsync(int orderId)
    {
        var order = await _unitOfWork.Orders.GetOrderWithDetailsAsync(orderId);
        return order == null ? null : MapToViewModel(order);
    }

    public async Task<IEnumerable<OrderViewModel>> GetAllOrdersAsync()
    {
        var orders = await _unitOfWork.Orders.GetAllWithDetailsAsync();
        return orders.Select(MapToViewModel);
    }

    public async Task UpdateOrderStatusAsync(int orderId, OrderStatus status)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(orderId);
        if (order == null) return;

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();
    }

    private static OrderViewModel MapToViewModel(Order order) => new()
    {
        Id = order.Id,
        UserName = order.User?.FullName ?? "Unknown",
        UserEmail = order.User?.Email ?? "",
        Status = order.Status,
        TotalAmount = order.TotalAmount,
        DeliveryAddress = order.DeliveryAddress,
        Notes = order.Notes,
        OrderedAt = order.OrderedAt,
        OrderItems = order.OrderItems.Select(oi => new OrderItemViewModel
        {
            FoodItemName = oi.FoodItem?.Name ?? "Unknown",
            Quantity = oi.Quantity,
            UnitPrice = oi.UnitPrice
        }).ToList()
    };
}
