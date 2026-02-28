using System;

namespace AbstractClassDemo
{
    abstract class Shape
    {
        public abstract void CalcArea(double radius);
        public abstract void CalcVolume(int side);
    }

    class CircleCube : Shape
    {
        public override void CalcArea(double radius)
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
            Shape obj = new CircleCube();

            Console.WriteLine("Enter the value for radius:");
            double radius = Convert.ToDouble(Console.ReadLine());
            obj.CalcArea(radius);

            Console.WriteLine("Enter the value for side:");
            int side = Convert.ToInt32(Console.ReadLine());
            obj.CalcVolume(side);

            Console.ReadLine();
        }
    }
}



//Create an abstract base class DrawingObject
//Abstract method()
//create derived classes: line, circle, square
//each class should ovveride the draw() method and display in main
//using System;

//namespace AbstractDemo
//{
//    // Abstract base class
//    abstract class DrawingObject
//    {
//        public abstract void Draw();
//    }

//    // Derived class Line
//    class Line : DrawingObject
//    {
//        public override void Draw()
//        {
//            Console.WriteLine("Im a Line");
//        }
//    }

//    // Derived class Circle
//    class Circle : DrawingObject
//    {
//        public override void Draw()
//        {
//            Console.WriteLine("Im  a Circle");
//        }
//    }

//    // Derived class Square
//    class Square : DrawingObject
//    {
//        public override void Draw()
//        {
//            Console.WriteLine("Im a Square");
//        }
//    }

//    class TestApp
//    {
//        static void Main(string[] args)
//        {
//            // Array of abstract class
//            DrawingObject[] shapes = new DrawingObject[3];

//            // Storing derived class objects
//            shapes[0] = new Line();
//            shapes[1] = new Circle();
//            shapes[2] = new Square();

//            // Calling Draw() using loop
//            foreach (DrawingObject obj in shapes)
//            {
//                obj.Draw();
//            }

//            Console.ReadLine();
//        }
//    }
//}