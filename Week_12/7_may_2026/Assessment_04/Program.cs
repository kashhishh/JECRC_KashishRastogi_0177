using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Access log array
        int[] logs = {1,3,2,3,3,4,5,3,6,7,8,9,10,3};

        // Difference value
        int K = 2;

        // ------------------------------------------------
        // Frequency Dictionary
        // ------------------------------------------------
        Dictionary<int, int> frequency =
            new Dictionary<int, int>();

        foreach (int num in logs)
        {
            if (frequency.ContainsKey(num))
            {
                frequency[num]++;
            }
            else
            {
                frequency[num] = 1;
            }
        }

        // ------------------------------------------------
        // 1. Longest Consecutive Sequence
        // ------------------------------------------------
        HashSet<int> set = new HashSet<int>(logs);

        int longestLength = 0;
        List<int> longestSequence = new List<int>();

        foreach (int num in set)
        {
            // Start only if previous number not present
            if (!set.Contains(num - 1))
            {
                int current = num;
                List<int> temp = new List<int>();

                while (set.Contains(current))
                {
                    temp.Add(current);
                    current++;
                }

                if (temp.Count > longestLength)
                {
                    longestLength = temp.Count;
                    longestSequence = temp;
                }
            }
        }

        // ------------------------------------------------
        // 2. Most Frequent Element
        // ------------------------------------------------
        int mostFrequent =
            frequency.OrderByDescending(x => x.Value)
                     .First().Key;

        int mostCount = frequency[mostFrequent];

        // ------------------------------------------------
        // 3. First Non-Repeating Element
        // ------------------------------------------------
        int firstNonRepeating = -1;

        foreach (int num in logs)
        {
            if (frequency[num] == 1)
            {
                firstNonRepeating = num;
                break;
            }
        }

        // ------------------------------------------------
        // 4. Pairs with Difference K
        // ------------------------------------------------
        List<string> pairs = new List<string>();

        foreach (int num in set)
        {
            if (set.Contains(num + K))
            {
                pairs.Add("(" + num + ", " + (num + K) + ")");
            }
        }

        // ------------------------------------------------
        // 5. Majority Element
        // ------------------------------------------------
        int n = logs.Length;

        bool hasMajority = mostCount > n / 2;

        double percentage =
            ((double)mostCount / n) * 100;

        // ------------------------------------------------
        // OUTPUT
        // ------------------------------------------------
        Console.WriteLine("--- Access Pattern Analysis ---");

        // Longest Sequence
        Console.WriteLine("\nLongest Consecutive Sequence:");

        Console.WriteLine(
            string.Join(",", longestSequence) +
            " (Length: " + longestLength + ")"
        );

        // Most Frequent
        Console.WriteLine(
            "\nMost Frequent Element: " +
            mostFrequent +
            " (appears " + mostCount + " times)"
        );

        // First Non-Repeating
        Console.WriteLine(
            "\nFirst Non-Repeating Element: " +
            firstNonRepeating
        );

        // Pairs
        Console.WriteLine(
            "\nPairs with Difference " + K + ":"
        );

        Console.WriteLine(string.Join(", ", pairs));

        // Majority
        Console.WriteLine("\nMajority Element:");

        Console.WriteLine(
            mostFrequent +
            " (appears " + mostCount +
            " out of " + n +
            " times - " +
            percentage.ToString("0.0") + "% - " +
            (hasMajority ? "Majority" : "No majority")
        );
    }
}