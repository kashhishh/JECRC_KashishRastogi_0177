//using System;

//class ExcDemo1
//{
//    public static void Main()
//    {
//        int[] nums = new int[4];

//        try
//        {
//            Console.WriteLine("Before exception is generated.");
//            // Generate an index out-of-bounds exception.
//            for (int i = 0; i < 10; i++)
//            {
//                nums[i] = i;
//                Console.WriteLine("nums[{0}]: {1}", i, nums[i]);
//            }
//            Console.WriteLine("This won't be displayed");
//        }
//        catch (IndexOutOfRangeException)
//        {
//            // catch the exception
//            Console.WriteLine("Index out-of-bounds!");
//        }

//        Console.WriteLine("After catch statement.");
//    }
//}
//using System;

//class ExcDemo4
//{
//    public static void Main()
//    {
//        // Here, numer is longer than denom.
//        int[] numer = { 4, 8, 16, 32, 64, 128, 256, 512 };
//        int[] denom = { 2, 0, 4, 4, 0, 8 };

//        for (int i = 0; i < numer.Length; i++)
//        {
//            try
//            {
//                Console.WriteLine(
//                    numer[i] + " / " +
//                    denom[i] + " is " +
//                    numer[i] / denom[i]
//                );
//            }
//            catch (DivideByZeroException)
//            {
//                // catch the exception
//                Console.WriteLine("Can't divide by zero!");
//            }
//            catch (IndexOutOfRangeException)
//            {
//                // catch the exception
//                Console.WriteLine("No matching element found.");
//            }
//        }
//    }
//}
using System;

namespace UserDefinedExceptionDemo
{
    // User Defined Exception
    class MyException : Exception
    {
        public MyException(string message) : base(message)
        {
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            int a = 50;
            int b = 10;
            int k = a / b;

            try
            {
                if (k < 10)
                {
                    throw new MyException("Value of k is less than 10");
                }
                else
                {
                    Console.WriteLine("Value of k is valid: " + k);
                }
            }
            catch (MyException e)
            {
                Console.WriteLine("Caught MyException");
                Console.WriteLine(e.Message);
            }

            Console.ReadLine();
        }
    }
}