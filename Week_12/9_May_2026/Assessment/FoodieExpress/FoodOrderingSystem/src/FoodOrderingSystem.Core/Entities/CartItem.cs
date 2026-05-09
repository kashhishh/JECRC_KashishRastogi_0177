namespace FoodOrderingSystem.Core.Entities;

public class CartItem
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int FoodItemId { get; set; }
    public int Quantity { get; set; }

    public Cart Cart { get; set; } = null!;
    public FoodItem FoodItem { get; set; } = null!;

    public decimal SubTotal => FoodItem != null ? FoodItem.Price * Quantity : 0;
}
