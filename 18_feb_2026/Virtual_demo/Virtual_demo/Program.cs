

namespace VirtualDemo
{
    // Base class
    class DrawingObject
    {
        public virtual void Draw()
        {
            Console.WriteLine("Drawing an object");
        }
    }

    // Derived class Line
    class Line : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("Drawing a Line");
        }
    }

    // Derived class Circle
    class Circle : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("Drawing a Circle");
        }
    }

    // Derived class Square
    class Square : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("Drawing a Square");
        }
    }

    class TestApp
    {
        static void Main(string[] args)
        {
            // Array of base class
            DrawingObject[] shapes = new DrawingObject[3];

            shapes[0] = new Line();
            shapes[1] = new Circle();
            shapes[2] = new Square();

            // Polymorphism using virtual method
            foreach (DrawingObject obj in shapes)
            {
                obj.Draw();
            }

            Console.ReadLine();
        }
    }
}

