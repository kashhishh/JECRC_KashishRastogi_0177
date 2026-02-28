//using System;

//namespace InterfaceDemo
//{
//    interface IArea
//    {
//        void CalcArea(double radius);
//    }

//    interface IVolume
//    {
//        void CalcVolume(int side);
//    }

//    public class CircleCube : IArea, IVolume
//    {
//        public void CalcArea(double radius)
//        {
//            double pi = 3.14;
//            double result = pi * radius * radius;
//            Console.WriteLine("Area of Circle = " + result);
//        }

//        public void CalcVolume(int side)
//        {
//            int result = side * side * side;
//            Console.WriteLine("Volume of Cube = " + result);
//        }
//    }

//    class TestApp
//    {
//        public static void Main(string[] args)
//        {
//            CircleCube obj = new CircleCube();

//            Console.WriteLine("Enter the value for radius:");
//            double radius = Convert.ToDouble(Console.ReadLine());
//            obj.CalcArea(radius);

//            Console.WriteLine("Enter the value for side:");
//            int side = Convert.ToInt32(Console.ReadLine());
//            obj.CalcVolume(side);

//            Console.ReadLine();
//        }
//    }
//}
//------------------------------------------------------------------------------------------------------------------------------



using System;

namespace InterfaceAbstractDemo
{
    interface IArea
    {
        void CalcArea(double radius);
    }

    abstract class Volume
    {
        public abstract void CalcVolume(int side);
    }

    class CircleCube : Volume, IArea
    {
        public void CalcArea(double radius)
        {
            double pi = 3.14;
            double result = pi * radius * radius;
            Console.WriteLine("Area of Circle = " + result);
        }

        public override void CalcVolume(int side)
        {
            int result = side * side * side;
            Console.WriteLine("Volume of Cube = " + result);
        }
    }

    class TestApp
    {
        static void Main(string[] args)
        {
            CircleCube obj = new CircleCube();

            Console.WriteLine("Enter radius:");
            double radius = Convert.ToDouble(Console.ReadLine());
            obj.CalcArea(radius);

            Console.WriteLine("Enter side:");
            int side = Convert.ToInt32(Console.ReadLine());
            obj.CalcVolume(side);

            Console.ReadLine();
        }
    }
}




