using System.ComponentModel.DataAnnotations;

namespace StudentAttendanceSystem.Model
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public string StudentName { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        public bool IsPresent { get; set; }

        public string Remarks { get; set; } = string.Empty;
    }
}