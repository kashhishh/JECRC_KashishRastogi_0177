using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Creating HashSets for each category
        HashSet<string> electronics = new HashSet<string>()
        {
            "C001","C002","C003","C005","C008"
        };

        HashSet<string> clothing = new HashSet<string>()
        {
            "C002","C004","C005","C006","C009"
        };

        HashSet<string> books = new HashSet<string>()
        {
            "C003","C005","C007","C008","C010"
        };

        // ---------------------------------
        //  UNION -> Customers in ANY category
        // ---------------------------------
        HashSet<string> anyCategory = new HashSet<string>(electronics);

        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        // ---------------------------------
        //  INTERSECTION -> Customers in ALL categories
        // ---------------------------------
        HashSet<string> allCategory = new HashSet<string>(electronics);

        allCategory.IntersectWith(clothing);
        allCategory.IntersectWith(books);

        // ---------------------------------
        //  ONLY Electronics
        // Electronics - Clothing - Books
        // ---------------------------------
        HashSet<string> onlyElectronics = new HashSet<string>(electronics);

        onlyElectronics.ExceptWith(clothing);
        onlyElectronics.ExceptWith(books);

        // ---------------------------------
        //  Electronics AND Books but NOT Clothing
        // ---------------------------------
        HashSet<string> eAndBooks = new HashSet<string>(electronics);

        eAndBooks.IntersectWith(books);
        eAndBooks.ExceptWith(clothing);

        // ---------------------------------
        // OUTPUT
        // ---------------------------------

        Console.WriteLine("--- Customer Preference Analysis ---");

        //  Union
        Console.WriteLine("\n1. Customers in ANY category (Union):");

        foreach (string customer in anyCategory)
        {
            Console.Write(customer + " ");
        }

        Console.WriteLine("\nTotal: " + anyCategory.Count + " customers");

        // 2. Intersection
        Console.WriteLine("\n2. Customers in ALL categories (Intersection):");

        foreach (string customer in allCategory)
        {
            Console.Write(customer + " ");
        }

        Console.WriteLine("\nTotal: " + allCategory.Count + " customer");

        // 3. Only Electronics
        Console.WriteLine("\n3. Customers ONLY in Electronics:");

        foreach (string customer in onlyElectronics)
        {
            Console.Write(customer + " ");
        }

        Console.WriteLine("\nTotal: " + onlyElectronics.Count + " customers");

        // 4. Electronics AND Books but NOT Clothing
        Console.WriteLine("\n4. Customers in Electronics AND Books but NOT Clothing:");

        foreach (string customer in eAndBooks)
        {
            Console.Write(customer + " ");
        }

        Console.WriteLine("\nTotal: " + eAndBooks.Count + " customers");
    }
}
