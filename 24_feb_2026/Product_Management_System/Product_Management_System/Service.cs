using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace Product_Management_System
{
    internal class Service
    {
        private readonly string connectionstring =
            "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Products;Integrated Security=True";

        Model prod = new Model();

        public void Run()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("==== PRODUCT MANAGEMENT SYSTEM ====");
                Console.WriteLine("1. View All Products");
                Console.WriteLine("2. Insert Product");
                Console.WriteLine("3. Update Product");
                Console.WriteLine("4. Delete Product");
                Console.WriteLine("5. Search Product by Id");
                Console.WriteLine("6. Search Product by Category");
                Console.WriteLine("7. Sort Products by Price");
                Console.WriteLine("8. Exit");
                Console.Write("Enter your choice: ");

                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1: ViewProducts(); break;
                    case 2: InsertProduct(); break;
                    case 3: UpdateProduct(); break;
                    case 4: DeleteProduct(); break;
                    case 5: SearchById(); break;
                    case 6: SearchByCategory(); break;
                    case 7: SortProducts(); break;
                    case 8: return;
                    default: Console.WriteLine("Invalid Choice"); break;
                }

                Console.WriteLine("\nPress Enter to continue...");
                Console.ReadLine();
            }
        }

        // 1️⃣ VIEW ALL PRODUCTS
        public void ViewProducts()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT * FROM Products";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Console.WriteLine(
                    $"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetDouble(3)} | {reader.GetBoolean(4)}");
            }
        }

        // 2️⃣ INSERT PRODUCT
        public void InsertProduct()
        {
            Console.Write("Enter Product Name: ");
            prod.Name = Console.ReadLine();

            Console.Write("Enter Category: ");
            prod.Category = Console.ReadLine();

            Console.Write("Enter Price: ");
            prod.Price = Convert.ToSingle(Console.ReadLine());

            Console.Write("Is In Stock (true/false): ");
            prod.IsStock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                "INSERT INTO Products (Name, Category, Price, InStock) VALUES (@Name, @Category, @Price, @InStock)";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", prod.Name);
            cmd.Parameters.AddWithValue("@Category", prod.Category);
            cmd.Parameters.AddWithValue("@Price", prod.Price);
            cmd.Parameters.AddWithValue("@InStock", prod.IsStock);

            cmd.ExecuteNonQuery();
            Console.WriteLine("Product Inserted Successfully");
        }

        // 3️⃣ UPDATE PRODUCT
        public void UpdateProduct()
        {
            Console.Write("Enter Product Id: ");
            prod.Id = Convert.ToInt32(Console.ReadLine());

            Console.Write("Enter New Name: ");
            prod.Name = Console.ReadLine();

            Console.Write("Enter New Category: ");
            prod.Category = Console.ReadLine();

            Console.Write("Enter New Price: ");
            prod.Price = Convert.ToSingle(Console.ReadLine());

            Console.Write("Is In Stock (true/false): ");
            prod.IsStock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query =
                "UPDATE Products SET Name=@Name, Category=@Category, Price=@Price, InStock=@InStock WHERE Id=@Id";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", prod.Id);
            cmd.Parameters.AddWithValue("@Name", prod.Name);
            cmd.Parameters.AddWithValue("@Category", prod.Category);
            cmd.Parameters.AddWithValue("@Price", prod.Price);
            cmd.Parameters.AddWithValue("@InStock", prod.IsStock);

            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Product Updated Successfully" : "Product Not Found");
        }

        // 4️⃣ DELETE PRODUCT
        public void DeleteProduct()
        {
            Console.Write("Enter Product Id to Delete: ");
            int id = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "DELETE FROM Products WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Product Deleted" : "Product Not Found");
        }

        // 5️⃣ SEARCH BY ID
        public void SearchById()
        {
            Console.Write("Enter Product Id: ");
            int id = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT * FROM Products WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                Console.WriteLine(
                    $"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetDouble(3)} | {reader.GetBoolean(4)}");
            }
            else
            {
                Console.WriteLine("Product Not Found");
            }
        }

        // 6️⃣ SEARCH BY CATEGORY
        public void SearchByCategory()
        {
            Console.Write("Enter Category: ");
            string category = Console.ReadLine();

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT * FROM Products WHERE Category=@Category";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Category", category);

            using SqlDataReader reader = cmd.ExecuteReader();

            if (!reader.HasRows)
            {
                Console.WriteLine("No Products Found");
                return;
            }

            while (reader.Read())
            {
                Console.WriteLine(
                    $"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetDouble(3)} | {reader.GetBoolean(4)}");
            }
        }

        // 7️⃣ SORT PRODUCTS BY PRICE
        public void SortProducts()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT * FROM Products ORDER BY Price";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Console.WriteLine(
                    $"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetDouble(3)} | {reader.GetBoolean(4)}");
            }
        }
    }
}