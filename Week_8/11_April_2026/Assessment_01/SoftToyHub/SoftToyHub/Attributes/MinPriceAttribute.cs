using System.ComponentModel.DataAnnotations;

namespace SoftToyHub.Attributes
{
    public class MinPriceAttribute : ValidationAttribute
    {
        private readonly decimal _minPrice;

        public MinPriceAttribute(double minPrice)
        {
            _minPrice = (decimal)minPrice;
        }

        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            if (value == null)
                return new ValidationResult("Price is required");

            if ((decimal)value < _minPrice)
                return new ValidationResult($"Price must be at least {_minPrice}");

            return ValidationResult.Success;
        }
    }
}