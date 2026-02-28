using System;


class Program
{
    static void Main()
    {
           
        int[] numbers = { 1, 2, 3, 4, 5 };
        Console.WriteLine("Array elements are:");
        foreach (int number in numbers)
        {
            Console.WriteLine(number);
        }
        Console.ReadKey();
    }
}

