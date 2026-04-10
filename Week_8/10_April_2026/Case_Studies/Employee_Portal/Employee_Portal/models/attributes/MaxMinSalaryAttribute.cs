using System.ComponentModel.DataAnnotations;

namespace Employee_Portal.models.attributes
{
    public class MaxMinSalaryAttribute : ValidationAttribute
    {
        private readonly decimal minSalary;
        private readonly decimal maxSalary;

        public MaxMinSalaryAttribute(decimal minSalary, decimal maxSalary)
        {
            this.minSalary = minSalary;
            this.maxSalary = maxSalary;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is decimal salary)
            {
                if (salary < minSalary || salary > maxSalary)
                {
                    return new ValidationResult($"Salary must be between {minSalary} and {maxSalary}.");
                }
            }

            return ValidationResult.Success;
        }
    }
}