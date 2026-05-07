using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<int, int> stock = new Dictionary<int, int>();

        bool firstDisplay = true;

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string operation = parts[0];

            // ADD Operation
            if (operation == "ADD")
            {
                int productId = int.Parse(parts[1]);
                int qty = int.Parse(parts[2]);

                if (stock.ContainsKey(productId))
                    stock[productId] += qty;
                else
                    stock[productId] = qty;
            }

            // REMOVE Operation
            else if (operation == "REMOVE")
            {
                int productId = int.Parse(parts[1]);
                int qty = int.Parse(parts[2]);

                if (stock.ContainsKey(productId) && stock[productId] >= qty)
                {
                    stock[productId] -= qty;
                }
                else
                {
                    Console.WriteLine("Insufficient stock for Product " + productId);
                }
            }

            // CHECK Operation
            else if (operation == "CHECK")
            {
                int productId = int.Parse(parts[1]);

                int qty = 0;

                if (stock.ContainsKey(productId))
                    qty = stock[productId];

                Console.WriteLine("Product " + productId + ": " + qty + " units");
            }

            // BULK Operation
            else if (operation == "BULK")
            {
                string bulkData = input.Substring(5);

                string[] items = bulkData.Split(',');

                foreach (string item in items)
                {
                    string[] data = item.Split(':');

                    int productId = int.Parse(data[0]);
                    int qty = int.Parse(data[1]);

                    if (stock.ContainsKey(productId))
                        stock[productId] += qty;
                    else
                        stock[productId] = qty;
                }
            }

            // DISPLAY Operation
            else if (operation == "DISPLAY")
            {
                if (firstDisplay)
                {
                    Console.WriteLine("--- Current Inventory ---");
                    firstDisplay = false;
                }
                else
                {
                    Console.WriteLine("--- Updated Inventory ---");
                }

                foreach (var item in stock)
                {
                    if (item.Value > 0)
                    {
                        Console.WriteLine(item.Key + ": " + item.Value + " units");
                    }
                }
            }
        }
    }
}
