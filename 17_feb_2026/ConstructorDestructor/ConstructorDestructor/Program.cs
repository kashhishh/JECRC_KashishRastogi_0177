
// using System;
// class OLDExercise
// {
//     private int number;
//     public int Number{
//         get
//         {
//             return number;
//         }
//     }
//     public OLDExercise()
//     {
//         Random r = new Random();
//         number = r.Next();
//     }
//     public OLDExercise(int seed)
//     {
//         Random r = new Random(seed);
//         number = r.Next();
//     }
// }

// class Program
// {
//     static void Main(string[] args)
//     {
//         OLDExercise a = new OLDExercise();
//         Console.WriteLine("Static Number = " + a.Number);
//         OLDExercise b = new OLDExercise(500);
//         Console.WriteLine("Static Number = " + b.Number);
//     }
// }








//using System;

//class Product
//{
//    int productId;
//    string productName;
//    double price;


//    public Product(int id, string name, double cost)
//    {
//        productId = id;
//        productName = name;
//        price = cost;
//    }

//    public void Display()
//    {
//        Console.WriteLine("Product ID   : " + productId);
//        Console.WriteLine("Product Name : " + productName);
//        Console.WriteLine("Price        : " + price);
//    }
//}

//class Program
//{
//    static void Main(string[] args)
//    {

//        Product p = new Product(101, "Laptop", 55000.00);
//        p.Display();
//    }
//}








//Default constructor

//using System;

//class ODLExercise
//{
//    private int number;

//    public int Number
//    {
//        get { return number; }
//    }

//    // Default Constructor
//    public ODLExercise()
//    {
//        Random r = new Random();
//        number = r.Next();
//    }
//}

//class Program
//{
//    static void Main(string[] args)
//    {
//        ODLExercise num = new ODLExercise();
//        Console.WriteLine("Static Number = " + num.Number);
//    }
//}







//using System;

//class ODLExercise
//{
//    private int number;

//    public int Number
//    {
//        get { return number; }
//    }

//    // Default Constructor
//    public ODLExercise()
//    {
//        Random r = new Random();
//        number = r.Next();
//    }

//    // Parameterized Constructor
//    public ODLExercise(int seed)
//    {
//        Random r = new Random(seed);
//        number = r.Next();
//    }
//}

//class Program
//{
//    static void Main(string[] args)
//    {
//        ODLExercise num = new ODLExercise();
//        Console.WriteLine("Static Number = " + num.Number);

//        ODLExercise num1 = new ODLExercise(500);
//        Console.WriteLine("Static Speed = " + num1.Number);
//    }
//}









namespace ConsoleApp
{
    class Product
    {
        // Properties
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public bool BrandISO { get; set; }

        // Parameterized Constructor
        public Product(int id, string name, DateTime expiryDate,
                       int quantity, double price, bool brandISO)
        {
            Id = id;
            Name = name;
            ExpiryDate = expiryDate;
            Quantity = quantity;
            Price = price;
            BrandISO = brandISO;
        }

        // Method to display data
        public void DisplayProductData()
        {
            Console.WriteLine("\n--- Product Details ---");
            Console.WriteLine("Product Id: " + Id);
            Console.WriteLine("Product Name: " + Name);
            Console.WriteLine("Expiry Date: " + ExpiryDate.ToShortDateString());
            Console.WriteLine("Quantity: " + Quantity);
            Console.WriteLine("Price: " + Price);
            Console.WriteLine("Brand ISO Certified: " + BrandISO);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter Product Id:");
            int id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Product Name:");
            string name = Console.ReadLine();

            Console.WriteLine("Enter Expiry Date (yyyy-mm-dd):");
            DateTime expiryDate = Convert.ToDateTime(Console.ReadLine());

            Console.WriteLine("Enter Product Quantity:");
            int quantity = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Product Price:");
            double price = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Is Brand ISO Certified? (true/false):");
            bool brandISO = Convert.ToBoolean(Console.ReadLine());

            // Creating object using parameterized constructor
            Product prod = new Product(id, name, expiryDate, quantity, price, brandISO);

            prod.DisplayProductData();
        }
    }
}

