using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace EmployeemanagementSystem
{
    public class Employee
    {
        public int EMP_ID { get; set; }
        public string? EMP_NAME { get; set; }
         public string? EMP_DESIGNATION { get; set; }
          public int EMP_SALARY { get; set; }
    }

    class Program
    {
        static void Main()
        {
            string connectionString =
                "Server=(localdb)\\MSSQLLocalDB;Database=SQL_TRAINING;Trusted_Connection=True;";

            List<Employee> employees = new List<Employee>();

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();

                    string query = "SELECT EMP_ID, EMP_NAME, EMP_DESIGNATION, EMP_SALARY FROM Employee_Details";

                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            employees.Add(new Employee
                            {
                                EMP_ID = reader.GetInt32(0),
                                EMP_NAME = reader.GetString(1),
                                EMP_DESIGNATION  = reader.GetString(2),
                                EMP_SALARY = reader.GetInt32(3)
                            });
                        }
                    }
                }

                Console.WriteLine("\nEmployee List:\n");

                foreach (var emp in employees)
                {
                    Console.WriteLine($"Id: {emp.EMP_ID}");
                    Console.WriteLine($"Name: {emp.EMP_NAME}");
                    Console.WriteLine($"Department: {emp.EMP_DESIGNATION}");
                    Console.WriteLine($"Salary: {emp.EMP_SALARY}");
                    Console.WriteLine("------------------------");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            Console.ReadLine();
        }
    }
}