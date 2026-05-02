using EMS.InMemoryAPI.Models;

namespace EMS.InMemoryAPI.Repositories
{
    public static class EmployeeRepository
    {
        private static List<Employee> employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "John", Department = "HR", Salary = 50000 },
            new Employee { Id = 2, Name = "Alice", Department = "IT", Salary = 70000 }
        };

        // FIX: make it a METHOD
        public static List<Employee> GetAll()
        {
            return employees;
        }

        public static Employee GetById(int id)
        {
            return employees.FirstOrDefault(e => e.Id == id);
        }

        public static void Add(Employee employee)
        {
            employee.Id = employees.Max(e => e.Id) + 1;
            employees.Add(employee);
        }

        public static void Update(Employee employee)
        {
            var existing = GetById(employee.Id);
            if (existing != null)
            {
                existing.Name = employee.Name;
                existing.Department = employee.Department;
                existing.Salary = employee.Salary;
            }
        }

        public static void Delete(int id)
        {
            var employee = GetById(id);
            if (employee != null)
            {
                employees.Remove(employee);
            }
        }
    }
}