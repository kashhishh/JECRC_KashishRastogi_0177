using SoftToyHub.DTOs;
using SoftToyHub.DTOs;
using System.ComponentModel.DataAnnotations;

namespace SoftToyHub.Attributes
{
    public class StockAvailableAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            var dto = (CreateSoftToyDto)context.ObjectInstance;

            if (dto.Stock == 0 && dto.IsAvailable)
                return new ValidationResult("Cannot be available when stock is 0");

            return ValidationResult.Success;
        }
    }
}