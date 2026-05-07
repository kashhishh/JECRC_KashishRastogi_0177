using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        // Input paragraph
        string text = "The quick brown fox jumps over the lazy dog. The fox is quick and the dog is lazy. Quick brown fox jumps over the lazy dog again.";

        // Number of top frequent words
        int N = 3;

        // -----------------------------------------
        // Convert text to lowercase
        // -----------------------------------------
        text = text.ToLower();

        // -----------------------------------------
        // Remove punctuation
        // -----------------------------------------
        text = Regex.Replace(text, @"[^\w\s]", "");

        // -----------------------------------------
        // Split paragraph into words
        // -----------------------------------------
        string[] words = text.Split(
            new char[] { ' ' },
            StringSplitOptions.RemoveEmptyEntries
        );

        // -----------------------------------------
        // Dictionary to store word frequencies
        // -----------------------------------------
        Dictionary<string, int> frequency =
            new Dictionary<string, int>();

        // -----------------------------------------
        // Count frequency of each word
        // -----------------------------------------
        foreach (string word in words)
        {
            if (frequency.ContainsKey(word))
            {
                frequency[word]++;
            }
            else
            {
                frequency[word] = 1;
            }
        }

        // -----------------------------------------
        // Total words
        // -----------------------------------------
        int totalWords = words.Length;

        // -----------------------------------------
        // Unique words
        // -----------------------------------------
        int uniqueWords = frequency.Count;

        // -----------------------------------------
        // Top N frequent words
        // -----------------------------------------
        var topWords = frequency
            .OrderByDescending(x => x.Value)
            .ThenBy(x => x.Key)
            .Take(N);

        // -----------------------------------------
        // Words appearing exactly once
        // -----------------------------------------
        var singleWords = frequency
            .Where(x => x.Value == 1)
            .Select(x => x.Key);

        // -----------------------------------------
        // Average frequency
        // -----------------------------------------
        double average =
            (double)totalWords / uniqueWords;

        // -----------------------------------------
        // OUTPUT
        // -----------------------------------------
        Console.WriteLine("--- Word Frequency Analysis ---");

        Console.WriteLine("\nTotal words: " + totalWords);

        Console.WriteLine("Unique words: " + uniqueWords);

        // Top N words
        Console.WriteLine("\nTop " + N + " Frequent Words:\n");

        foreach (var item in topWords)
        {
            Console.WriteLine(item.Key + ": " +
                              item.Value + " times");
        }

        // Words appearing once
        Console.WriteLine("\nWords appearing exactly once:\n");

        foreach (string word in singleWords)
        {
            Console.Write(word + ", ");
        }

        // Average frequency
        Console.WriteLine("\n\nAverage frequency: " +
                          average.ToString("0.00") +
                          " times per unique word");
    }
}