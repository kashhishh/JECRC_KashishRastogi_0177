using System.ComponentModel.DataAnnotations;
using Employee_Portal.models.attributes;

namespace EmployeePortal.models.dto
{
    public class CreateEmployeeDto
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public required string name { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public required string department { get; set; }
        [Required]
        [EmailAddress]
        public required string email { get; set; }

        [Required]
        public required string password { get; set; }

        [Required]
        [Phone]
        [RegularExpression(@"^\+[1-9][1-9]-[6-9]\d{5,14}$", ErrorMessage = "Invalid phone number format.")] //only decimals with d and ^ for first number and range of 1st number and also @ for regual number , $ at the end to indicate that it ended , this dollar here ,
                                                                                                            //handling the usa range of 14 number max and also  adding the front +code with +91 or so
        public required string phone { get; set; }
        [MaxMinSalary(10000, 1000)]
        [Range(1000, 10000, ErrorMessage = "Salary must be between 1000 and 10000.")]
        public decimal salary { get; set; }
        [StringLength(50)]
        public required string address { get; set; }

        [Required]
        [Range(18, 60)]
        public int age { get; set; }
    }

}