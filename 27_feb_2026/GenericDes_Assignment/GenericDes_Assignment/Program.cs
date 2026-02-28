//You are building a Generic Data Export System for an enterprise application.

using GenericDES;

//Different modules need export functionality:

        //Employee List Export

       // Product List Export

       // Order List Export

//Each module contains different data types, but export operations remain the same.
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Text.Json;

namespace GenericDES
{
    // Employee Model
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Salary { get; set; }
    }

    // Product Model
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
    }

    // Generic Export Service
    public class ExportService<T>
    {
        // CSV Export using Reflection
        public string ExportToCSV(List<T> data)
        {
            StringBuilder sb = new StringBuilder();
            PropertyInfo[] properties = typeof(T).GetProperties();

            // Header
            for (int i = 0; i < properties.Length; i++)
            {
                sb.Append(properties[i].Name);
                if (i < properties.Length - 1) sb.Append(",");
            }
            sb.AppendLine();

            // Rows
            foreach (var item in data)
            {
                for (int i = 0; i < properties.Length; i++)
                {
                    var value = properties[i].GetValue(item);
                    sb.Append(value);
                    if (i < properties.Length - 1) sb.Append(",");
                }
                sb.AppendLine();
            }

            return sb.ToString();
        }

        // JSON Export
        public string ExportToJSON(List<T> data)
        {
            return JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = true
            });
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // Employee List
            var employees = new List<Employee>
            {
                new Employee { Id = 1, Name = "John", Salary = 50000 },
                new Employee { Id = 2, Name = "Sara", Salary = 60000 }
            };

            // Product List
            var products = new List<Product>
            {
                new Product { Id = 101, Name = "Laptop", Price = 75000 },
                new Product { Id = 102, Name = "Mobile", Price = 25000 }
            };

            var empExport = new ExportService<Employee>();
            var prodExport = new ExportService<Product>();

            Console.WriteLine("===== EMPLOYEE CSV =====");
            Console.WriteLine(empExport.ExportToCSV(employees));

            Console.WriteLine("===== EMPLOYEE JSON =====");
            Console.WriteLine(empExport.ExportToJSON(employees));

            Console.WriteLine("===== PRODUCT CSV =====");
            Console.WriteLine(prodExport.ExportToCSV(products));

            Console.WriteLine("===== PRODUCT JSON =====");
            Console.WriteLine(prodExport.ExportToJSON(products));
        }
    }
}
