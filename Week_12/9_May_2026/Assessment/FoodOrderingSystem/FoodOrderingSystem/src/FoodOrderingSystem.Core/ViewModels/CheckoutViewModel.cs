using System.ComponentModel.DataAnnotations;

namespace FoodOrderingSystem.Core.ViewModels;

public class CheckoutViewModel
{
    [Required(ErrorMessage = "Delivery address is required")]
    [Display(Name = "Delivery Address")]
    public string DeliveryAddress { get; set; } = string.Empty;

    public string? Notes { get; set; }

    public List<CartItemViewModel> CartItems { get; set; } = new();
    public decimal TotalAmount { get; set; }
}
