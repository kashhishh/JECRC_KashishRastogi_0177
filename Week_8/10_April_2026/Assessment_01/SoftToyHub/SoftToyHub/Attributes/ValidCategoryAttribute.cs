using System.ComponentModel.DataAnnotations;

namespace SoftToyHub.Attributes
{
    public class ValidCategoryAttribute : ValidationAttribute
    {
        private readonly string[] _categories;

        public ValidCategoryAttribute(string[] categories)
        {
            _categories = categories;
        }

        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            if (value == null)
                return new ValidationResult("Category is required");

            if (!_categories.Contains(value.ToString()))
                return new ValidationResult($"Allowed: {string.Join(", ", _categories)}");

            return ValidationResult.Success;
        }
    }
}