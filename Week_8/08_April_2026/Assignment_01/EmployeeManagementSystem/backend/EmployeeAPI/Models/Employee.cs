namespace EmployeeAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public string Status { get; set; } = "Active";
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;
    }
}