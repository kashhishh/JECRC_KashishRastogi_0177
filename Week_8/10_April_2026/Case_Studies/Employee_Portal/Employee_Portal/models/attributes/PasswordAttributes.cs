using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Employee_Portal.Models.Attributes
{
    public class PasswordAttribute : ValidationAttribute
    {
        private readonly int minLength;

        public PasswordAttribute(int minLength = 8)
        {
            this.minLength = minLength;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string password)
            {
                // Check minimum length
                if (password.Length < minLength)
                {
                    return new ValidationResult($"Password must be at least {minLength} characters long.");
                }

                // Check for uppercase letter
                if (!Regex.IsMatch(password, "[A-Z]"))
                {
                    return new ValidationResult("Password must contain at least one uppercase letter.");
                }

                // Check for lowercase letter
                if (!Regex.IsMatch(password, "[a-z]"))
                {
                    return new ValidationResult("Password must contain at least one lowercase letter.");
                }

                // Check for digit
                if (!Regex.IsMatch(password, "[0-9]"))
                {
                    return new ValidationResult("Password must contain at least one number.");
                }

                // Check for special character
                if (!Regex.IsMatch(password, "[^a-zA-Z0-9]"))
                {
                    return new ValidationResult("Password must contain at least one special character.");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult("Invalid password format.");
        }
    }
}