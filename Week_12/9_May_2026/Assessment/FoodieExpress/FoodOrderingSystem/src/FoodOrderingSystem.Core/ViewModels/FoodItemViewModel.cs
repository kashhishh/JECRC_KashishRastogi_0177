using System.ComponentModel.DataAnnotations;

namespace FoodOrderingSystem.Core.ViewModels;

public class FoodItemViewModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Price is required")]
    [Range(0.01, 99999.99, ErrorMessage = "Price must be greater than 0")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "Category is required")]
    [Display(Name = "Category")]
    public int CategoryId { get; set; }

    [Display(Name = "Is Available")]
    public bool IsAvailable { get; set; } = true;

    public string? ExistingImagePath { get; set; }
    public string? CategoryName { get; set; }
}
