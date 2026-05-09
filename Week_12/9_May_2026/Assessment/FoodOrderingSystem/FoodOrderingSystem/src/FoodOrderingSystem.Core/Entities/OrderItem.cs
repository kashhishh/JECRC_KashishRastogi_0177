namespace FoodOrderingSystem.Core.Entities;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int FoodItemId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public Order Order { get; set; } = null!;
    public FoodItem FoodItem { get; set; } = null!;

    public decimal SubTotal => UnitPrice * Quantity;
}
