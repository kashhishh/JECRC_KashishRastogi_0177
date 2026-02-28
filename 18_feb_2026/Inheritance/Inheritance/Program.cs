using System;

namespace InheritanceDemo
{
    public class Person
    {
        private string Name;
        private int Age;

        public void GetInformation()
        {
            Console.WriteLine("Enter your name:");
            Name = Console.ReadLine();

            Console.WriteLine("Enter your age:");
            Age = int.Parse(Console.ReadLine());
        }

        public void DisplayInformation()
        {
            Console.WriteLine("Welcome to .NET Training Mr/Mrs {0}, and your age is {1}", Name, Age);
        }
    }

    public class Employee : Person
    {
        protected string CompanyName;
        protected int EmployeeID;
        protected int EmployeeScore;

        public void GetEmployeeInformation()
        {
            Console.WriteLine("Enter your company name:");
            CompanyName = Console.ReadLine();

            Console.WriteLine("Enter your Employee ID:");
            EmployeeID = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter your Employee Score:");
            EmployeeScore = int.Parse(Console.ReadLine());
        }

        public void DisplayEmployeeInformation()
        {
            Console.WriteLine(
                "Welcome to company {0}, your ID is {1} and your score is {2}",
                CompanyName, EmployeeID, EmployeeScore
            );
        }
    }

    interface ITDepartment
    {
        string DepartmentName { get; set; }
        void DisplayDepartmentDetails();
    }

    public class GradeLevel : Employee, ITDepartment
    {
        public string DepartmentName { get; set; }

        public void CheckEligible()
        {
            if (EmployeeScore > 150)
            {
                Console.WriteLine("Employee is ELIGIBLE");
            }
            else
            {
                Console.WriteLine("Employee is NOT ELIGIBLE");
            }
        }

        public void DisplayDepartmentDetails()
        {
            Console.WriteLine("Department name: {0}", DepartmentName);
        }
    }

    public class TestProgram
    {
        static void Main(string[] args)
        {
            GradeLevel cap = new GradeLevel();

            cap.GetInformation();
            cap.DisplayInformation();

            cap.GetEmployeeInformation();
            cap.DisplayEmployeeInformation();

            cap.DepartmentName = "IT";

            cap.CheckEligible();
            cap.DisplayDepartmentDetails();
        }
    }
}
