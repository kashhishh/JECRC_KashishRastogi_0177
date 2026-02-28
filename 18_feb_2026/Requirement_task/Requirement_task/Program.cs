using System;

namespace AbstractDemo
{
    
    abstract class OrderProcessor
    {

        public int OrderId;
        public double Amount;

        
        public abstract void ProcessPayment();
        public abstract void GenerateInvoice();
        public abstract void SendNotification();

        
        public void DisplayOrderDetails()
        {
            Console.WriteLine("Order ID: " + OrderId);
            Console.WriteLine("Amount: " + Amount);
        }
    }

    
    class OnlineOrder : OrderProcessor
    {
        
        public override void ProcessPayment()
        {
            Console.WriteLine("Processing online payment...");
        }

        
        public override void GenerateInvoice()
        {
            Console.WriteLine("Generating digital invoice...");
        }

        
        public override void SendNotification()
        {
            Console.WriteLine("Sending email notification to customer...");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            
            OrderProcessor order = new OnlineOrder();

            
            order.OrderId = 1001;
            order.Amount = 75000;

            
            order.DisplayOrderDetails();
            order.ProcessPayment();
            order.GenerateInvoice();
            order.SendNotification();
        }
    }
}

