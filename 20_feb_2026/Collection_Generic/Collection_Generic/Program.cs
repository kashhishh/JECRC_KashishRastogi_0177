using System;
using System.Collections.Generic;

namespace ProductDemo
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsStock { get; set; }
    }

    public class ProductCatalog
    {
        private List<Product> products;

        public ProductCatalog()
        {
            //products = new List<Product>
            //{
            //    new Product
            //    {
            //        Id = 1,
            //        Name = "Laptop",
            //        Description = "Electronic Item",
            //        Price = 75000,
            //        IsStock = true
            //    },
            //    new Product
            //    {
            //        Id = 2,
            //        Name = "Smartphone",
            //        Description = "Electronic Item",
            //        Price = 55000,
            //        IsStock = true
            //    },
            //    new Product
            //    {
            //        Id = 3,
            //        Name = "Desk",
            //        Description = "Furniture",
            //        Price = 15000,
            //        IsStock = true
            //    },
            //    new Product
            //    {
            //        Id = 4,
            //        Name = "Notebook",
            //        Description = "Stationery",
            //        Price = 5000,
            //        IsStock = true
            //    }
            //};
            products = new List<Product>();
        }

        public void AddProduct()
        {
            Product product = new Product();

            Console.WriteLine("Enter the product id");
            product.Id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter the product Name");
            product.Name = Console.ReadLine();

            Console.WriteLine("Enter the product Description");
            product.Description = Console.ReadLine();

            Console.WriteLine("Enter the product price");
            product.Price = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Enter the product stock status (true/false)");
            product.IsStock = Convert.ToBoolean(Console.ReadLine());

            products.Add(product);
            Console.WriteLine("Product added successfully!");
        }

        public void DisplayProducts()
        {
            if (products.Count == 0)
            {
                Console.WriteLine("No products available.");
                return;
            }

            Console.WriteLine("\n----- Product List -----");
            foreach (var product in products)
            {
                Console.WriteLine("Product Id  : " + product.Id);
                Console.WriteLine("Name        : " + product.Name);
                Console.WriteLine("Description : " + product.Description);
                Console.WriteLine("Price       : " + product.Price);
                Console.WriteLine("In Stock    : " + product.IsStock);
                Console.WriteLine("-----------------------");
            }
        }

        // delete product by id
        public bool DeleteProduct(int id)
        {
            Product productToDelete = null;

            foreach (var product in products)
            {
                if (product.Id == id)
                {
                    productToDelete = product;
                    break;
                }
            }

            if (productToDelete != null)
            {
                products.Remove(productToDelete);
                return true;
            }

            return false;
        }
    }

    class TestProduct
    {
        static void Main(string[] args)
        {
            ProductCatalog catalog = new ProductCatalog();
            int choice;

            do
            {
                Console.WriteLine("\n 1.Add Product");
                Console.WriteLine(" 2.Display Product");
                Console.WriteLine(" 3.Delete Product");
                Console.WriteLine(" 4.Exit");
                Console.WriteLine(" Enter your choice");

                choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        catalog.AddProduct();
                        break;

                    case 2:
                        catalog.DisplayProducts();
                        break;

                    case 3:
                        Console.WriteLine("Enter product id to delete");
                        int id = Convert.ToInt32(Console.ReadLine());

                        if (catalog.DeleteProduct(id))
                            Console.WriteLine("Product deleted successfully!");
                        else
                            Console.WriteLine("Product not found!");
                        break;

                    case 4:
                        Console.WriteLine("Exiting...");
                        break;

                    default:
                        Console.WriteLine("Invalid Choice");
                        break;
                }

            } while (choice != 4);
        }
    }
}