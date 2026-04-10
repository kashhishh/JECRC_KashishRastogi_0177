using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace SoftToyHub.Attributes
{
    public class ToyNameValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            if (value == null)
                return new ValidationResult("Name is required");

            if (Regex.IsMatch(value.ToString(), @"\d"))
                return new ValidationResult("Name should not contain numbers");

            return ValidationResult.Success;
        }
    }
}