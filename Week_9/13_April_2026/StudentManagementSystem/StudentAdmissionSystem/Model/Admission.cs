using System.ComponentModel.DataAnnotations;

namespace StudentAdmissionSystem.Model
{
    public class Admission
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string StudentName { get; set; } = string.Empty;

        [Required]
        public string FatherName { get; set; } = string.Empty;

        [Required]
        public string Course { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public DateTime AdmissionDate { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    }
}