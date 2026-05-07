using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // ------------------------------------------------
        // Sales Data
        // Product, Region, Sales
        // ------------------------------------------------
        List<(string Product, string Region, int Sales)> data =
            new List<(string, string, int)>()
        {
            ("P001","North",1500),
            ("P001","South",2000),
            ("P002","North",3000),
            ("P001","East",2500),
            ("P002","South",1800),
            ("P003","North",1200),
            ("P001","West",2200),
            ("P002","West",2800),
            ("P003","South",900),
            ("P002","East",3200)
        };

        // Threshold
        double threshold = 2000;

        // ------------------------------------------------
        // Group By Product
        // ------------------------------------------------
        var productGroups =
            data.GroupBy(x => x.Product);

        Console.WriteLine(
            "--- Sales Report by Product and Region ---\n"
        );

        // ------------------------------------------------
        // Product Reports
        // ------------------------------------------------
        foreach (var productGroup in productGroups)
        {
            string product = productGroup.Key;

            Console.WriteLine("Product " + product + ":\n");

            // Region-wise sales
            foreach (var item in productGroup)
            {
                Console.WriteLine(
                    "  " + item.Region +
                    ": $" + item.Sales
                );
            }

            // Total sales
            int total =
                productGroup.Sum(x => x.Sales);

            // Average sales
            double average =
                productGroup.Average(x => x.Sales);

            // Min sales
            int minimum =
                productGroup.Min(x => x.Sales);

            // Max sales
            int maximum =
                productGroup.Max(x => x.Sales);

            Console.WriteLine(
                "\n  Total: $" + total +
                ", Average: $" +
                average.ToString("0.00")
            );

            Console.WriteLine();
        }

        // ------------------------------------------------
        // Best Selling Product by Region
        // ------------------------------------------------
        Console.WriteLine(
            "--- Best Selling Product by Region ---\n"
        );

        var regionGroups =
            data.GroupBy(x => x.Region);

        foreach (var regionGroup in regionGroups)
        {
            string region = regionGroup.Key;

            var best =
                regionGroup.OrderByDescending(x => x.Sales)
                           .First();

            Console.WriteLine(
                region + ": " +
                best.Product +
                " ($" + best.Sales + ")"
            );
        }

        // ------------------------------------------------
        // Underperforming Products
        // ------------------------------------------------
        Console.WriteLine(
            "\n--- Underperforming Products (< $" +
            threshold + " average) ---\n"
        );

        foreach (var productGroup in productGroups)
        {
            double average =
                productGroup.Average(x => x.Sales);

            if (average < threshold)
            {
                Console.WriteLine(
                    productGroup.Key +
                    " ($" +
                    average.ToString("0.00") + ")"
                );
            }
        }
    }
}