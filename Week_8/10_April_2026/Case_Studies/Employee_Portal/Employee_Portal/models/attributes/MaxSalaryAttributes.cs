using System.ComponentModel.DataAnnotations;

namespace Employee_Portal.models.attributes
{
    public class MaxSalaryAttribute : ValidationAttribute
    {
        private readonly int maxSalary;

        public MaxSalaryAttribute(int maxSalary)
        {
            this.maxSalary = maxSalary;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is decimal salary && salary > maxSalary)
            {
                return new ValidationResult($"Salary must not exceed {maxSalary}.");
            }

            return ValidationResult.Success;
        }
    }
}