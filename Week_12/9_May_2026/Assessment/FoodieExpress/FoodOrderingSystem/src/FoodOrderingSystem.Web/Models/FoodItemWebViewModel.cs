using System.ComponentModel.DataAnnotations;
using FoodOrderingSystem.Core.ViewModels;
using Microsoft.AspNetCore.Http;

namespace FoodOrderingSystem.Web.Models;

/// <summary>
/// Web-layer ViewModel that extends Core's FoodItemViewModel with IFormFile for image uploads.
/// </summary>
public class FoodItemWebViewModel : FoodItemViewModel
{
    [Display(Name = "Food Image")]
    public IFormFile? ImageFile { get; set; }
}
