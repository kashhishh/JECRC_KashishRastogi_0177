using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Model
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [Required]
        public string Course { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public DateTime EnrollmentDate { get; set; } = DateTime.Now;

        public bool IsActive { get; set; } = true;
    }
}