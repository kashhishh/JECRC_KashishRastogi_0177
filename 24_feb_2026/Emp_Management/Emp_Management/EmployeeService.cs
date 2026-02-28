using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;

namespace Emp_Management
{
    internal class EmployeeService
    {
        private readonly string connectionstring =
            "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Employee;Integrated Security=True";
        EmployeeModel emp = new EmployeeModel();

        public void Run()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("==== Employee Management System ====");
                Console.WriteLine("1. View all Employees");
                Console.WriteLine("2. Insert Employee");
                Console.WriteLine("3. Update Employee");
                Console.WriteLine("4. Delete Employee");
                Console.WriteLine("5. Search by Employee Id");
                Console.WriteLine("6. Search by Department Name");
                Console.WriteLine("7. Exit");
                Console.Write("Enter the choice: ");

                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        ViewEmployees();
                        break;

                    case 2:
                        InsertEmployee();
                        break;

                    case 3:
                        UpdateEmployee();
                        break;

                    case 4:
                        DeleteEmployee();
                        break;

                    case 5:
                        SearchById();
                        break;

                    case 6:
                        SearchByDepartment();
                        break;

                    case 7:
                        return;

                    default:
                        Console.WriteLine("Invalid choice");
                        break;
                }

                Console.WriteLine("\nPress Enter to continue");
                Console.ReadLine();
            }
        }

        public void ViewEmployees()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT Id, Name, Department, Salary FROM Employees";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();

            Console.WriteLine("Employee List");

            while (reader.Read())
            {
                Console.WriteLine(
                    $"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetInt32(3)}");
            }
        }

        public void InsertEmployee()
        {
            

            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();

            Console.WriteLine("Enter Employee Department");
            emp.Department = Console.ReadLine();

            Console.WriteLine("Enter Employee Salary");
            emp.Salary = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                "INSERT INTO Employees (Name, Department, Salary) VALUES (@Name, @Department, @Salary)";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);

            cmd.ExecuteNonQuery();
            Console.WriteLine("Inserted Successfully");
        }
        public void DeleteEmployee()
        {
            Console.WriteLine("Enter Employee ID");
            int Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                "DELETE FROM Employees WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("Id", Id);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Deleted Successfully" : "Employee not found");
                
        }
        public void UpdateEmployee()
        {
            Console.WriteLine("Enter the Employee ID");
            emp.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();

            Console.WriteLine("Enter Employee Department");
            emp.Department = Console.ReadLine();

            Console.WriteLine("Enter Employee Salary");
            emp.Salary = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                    "UPDATE Employees SET Name=@Name, Department=@Department, Salary=@Salary WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Updated Successfully" : "Employee not found");



        }
        public void SearchById()
        {
            Console.WriteLine("Enter the id you want to search");
            emp.Id= Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                "SELECT Id, Name,Department, Salary FROM Employees where ID=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                emp.Id=reader.GetInt32(0);
                emp.Name=reader.GetString(1);
                emp.Department=reader.GetString(2);
                emp.Salary = reader.GetInt32(3);
                Console.WriteLine($"{emp.Id} | {emp.Name} | {emp.Department} | {emp.Salary}");
            }
            else
            {
                Console.WriteLine("Employee Not Found");

            }
           
        }
        public void SearchByDepartment()
        {
            Console.WriteLine("Enter the Department you want to search");
            string department = Console.ReadLine();

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                "SELECT Id, Name, Department, Salary FROM Employees WHERE Department = @Department";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Department", department);

            using SqlDataReader reader = cmd.ExecuteReader();

            if (!reader.HasRows)
            {
                Console.WriteLine("No Employees Found in this Department");
                return;
            }

            while (reader.Read())
            {
                emp.Id = reader.GetInt32(0);
                emp.Name = reader.GetString(1);
                emp.Department = reader.GetString(2);
                emp.Salary = reader.GetInt32(3);

                Console.WriteLine($"{emp.Id} | {emp.Name} | {emp.Department} | {emp.Salary}");
            }
        }

    }
}
