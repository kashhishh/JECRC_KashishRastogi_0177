namespace EmployeeAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Employee"; // Admin or Employee
        public int? EmployeeId { get; set; } // linked employee record
        public Employee? Employee { get; set; }
    }
}