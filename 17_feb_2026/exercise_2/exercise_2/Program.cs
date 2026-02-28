using System;

class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public DateTime ExpiryDate { get; set; }
    public int ProductQuantity { get; set; }
    public bool IsoStandard { get; set; }
    public decimal Price { get; set; }

    public void DisplayProduct()
    {
        Console.WriteLine("\n--- Product Details ---");
        Console.WriteLine("Product ID: " + ProductId);
        Console.WriteLine("Product Name: " + ProductName);
        Console.WriteLine("Expiry Date: " + ExpiryDate.ToShortDateString());
        Console.WriteLine("Product Quantity: " + ProductQuantity);
        Console.WriteLine("ISO Standard: " + IsoStandard);
        Console.WriteLine("Price: ₹" + Price);
    }
}

class Program
{
    static void Main()
    {
        Product p = new Product();

        Console.Write("Enter Product ID: ");
        p.ProductId = int.Parse(Console.ReadLine());

        Console.Write("Enter Product Name: ");
        p.ProductName = Console.ReadLine();

        Console.Write("Enter Expiry Date (yyyy-mm-dd): ");
        p.ExpiryDate = DateTime.Parse(Console.ReadLine());

        Console.Write("Enter Product Quantity: ");
        p.ProductQuantity = int.Parse(Console.ReadLine());

        Console.Write("Is ISO Standard? (true/false): ");
        p.IsoStandard = bool.Parse(Console.ReadLine());

        Console.Write("Enter Price: ");
        p.Price = decimal.Parse(Console.ReadLine());

        p.DisplayProduct();
    }
}
