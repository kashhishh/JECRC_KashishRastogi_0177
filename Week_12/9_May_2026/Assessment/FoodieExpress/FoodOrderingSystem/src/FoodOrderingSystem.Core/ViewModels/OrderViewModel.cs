using FoodOrderingSystem.Core.Enums;

namespace FoodOrderingSystem.Core.ViewModels;

public class OrderViewModel
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public OrderStatus Status { get; set; }
    public string StatusDisplay => Status.ToString();
    public decimal TotalAmount { get; set; }
    public string DeliveryAddress { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime OrderedAt { get; set; }
    public List<OrderItemViewModel> OrderItems { get; set; } = new();
}

public class OrderItemViewModel
{
    public string FoodItemName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal => UnitPrice * Quantity;
}
