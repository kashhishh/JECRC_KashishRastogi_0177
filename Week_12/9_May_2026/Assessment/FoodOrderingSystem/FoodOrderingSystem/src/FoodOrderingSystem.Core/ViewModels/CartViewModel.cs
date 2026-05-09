namespace FoodOrderingSystem.Core.ViewModels;

public class CartViewModel
{
    public int CartId { get; set; }
    public List<CartItemViewModel> Items { get; set; } = new();
    public decimal TotalAmount => Items.Sum(i => i.SubTotal);
    public int TotalItems => Items.Sum(i => i.Quantity);
}

public class CartItemViewModel
{
    public int CartItemId { get; set; }
    public int FoodItemId { get; set; }
    public string FoodItemName { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal SubTotal => UnitPrice * Quantity;
}
