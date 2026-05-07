using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    // ------------------------------------------------
    // Bubble Sort
    // ------------------------------------------------
    static void BubbleSort(int[] arr)
    {
        int n = arr.Length;

        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i - 1; j++)
            {
                if (arr[j] > arr[j + 1])
                {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // ------------------------------------------------
    // Binary Search
    // ------------------------------------------------
    static int BinarySearch(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            if (arr[mid] == target)
            {
                return mid;
            }
            else if (arr[mid] < target)
            {
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }

        return -1;
    }

    static void Main()
    {
        // ------------------------------------------------
        // Product Prices
        // ------------------------------------------------
        int[] prices =
        {
            299, 499, 199, 399,
            599, 159, 699, 259
        };

        int targetSum = 698;

        // ------------------------------------------------
        // Original Prices
        // ------------------------------------------------
        Console.WriteLine(
            "--- Product Price Analysis ---\n"
        );

        Console.WriteLine(
            "Original Prices: " +
            string.Join(", ", prices)
        );

        // ------------------------------------------------
        // Sorting
        // ------------------------------------------------
        BubbleSort(prices);

        Console.WriteLine(
            "\nSorted Prices (Ascending): " +
            string.Join(", ", prices)
        );

        // ------------------------------------------------
        // Binary Search
        // ------------------------------------------------
        Console.WriteLine(
            "\nBinary Search Results:\n"
        );

        int index399 =
            BinarySearch(prices, 399);

        if (index399 != -1)
        {
            Console.WriteLine(
                "Price 399 found at index " +
                index399
            );
        }
        else
        {
            Console.WriteLine(
                "Price 399 not found"
            );
        }

        int index500 =
            BinarySearch(prices, 500);

        if (index500 != -1)
        {
            Console.WriteLine(
                "Price 500 found at index " +
                index500
            );
        }
        else
        {
            Console.WriteLine(
                "Price 500 not found"
            );
        }

        // ------------------------------------------------
        // Pairs with Target Sum
        // ------------------------------------------------
        Console.WriteLine(
            "\nPairs that sum to " +
            targetSum + ":\n"
        );

        HashSet<int> seen =
            new HashSet<int>();

        foreach (int price in prices)
        {
            int complement =
                targetSum - price;

            if (seen.Contains(complement))
            {
                Console.WriteLine(
                    "(" + complement +
                    ", " + price + ")"
                );
            }

            seen.Add(price);
        }

        // ------------------------------------------------
        // Longest Increasing Subsequence
        // ------------------------------------------------
        Console.WriteLine(
            "\nLongest Increasing Subsequence:\n"
        );

        List<int> lis =
            new List<int>();

        lis.Add(prices[0]);

        for (int i = 1; i < prices.Length; i++)
        {
            if (prices[i] > lis.Last())
            {
                lis.Add(prices[i]);
            }
        }

        Console.WriteLine(
            string.Join(", ", lis) +
            " (Length: " + lis.Count + ")"
        );

        // ------------------------------------------------
        // Statistics
        // ------------------------------------------------
        int lowest = prices.Min();

        int highest = prices.Max();

        double average =
            prices.Average();

        double median =
            (prices[3] + prices[4]) / 2.0;

        Console.WriteLine(
            "\nStatistics:\n"
        );

        Console.WriteLine(
            "Lowest Price: " + lowest
        );

        Console.WriteLine(
            "Highest Price: " + highest
        );

        Console.WriteLine(
            "Average Price: " +
            average.ToString("0.00")
        );

        Console.WriteLine(
            "Median Price: " +
            median.ToString("0.00")
        );
    }
}