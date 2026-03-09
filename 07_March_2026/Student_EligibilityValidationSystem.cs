/*You are building a Student Eligibility Validation System for a university admission portal.

Before allowing students to apply for courses, the system must validate eligibility conditions.

Different programs have different eligibility rules:

Engineering Program → Based on marks
Medical Program → Based on marks + age
Management Program → Based on marks + attendance
Key Constraints
Eligibility rules may change every academic year
Validation logic must be reusable
Core validation engine must remain unchanged
Validation logic should return true or false
This requirement demands condition-based validation, which is achieved using Predicate.*/

using System;

class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
    public int Age { get; set; }
    public int Attendance { get; set; }
}

class EligibilityEngine
{
    public void CheckEligibility(Student student, string program, Predicate<Student> rule)
    {
        bool result = rule(student);

        Console.WriteLine("========= ELIGIBILITY CHECK =========");
        Console.WriteLine("Student Name : " + student.Name);
        Console.WriteLine("Program      : " + program);
        Console.WriteLine("Eligible     : " + result);
        Console.WriteLine("-----------------------------------\n");
    }
}

class Program
{
    static void Main()
    {
        
        Student student = new Student
        {
            StudentId = 301,
            Name = "Ananya",
            Marks = 78,
            Age = 18,
            Attendance = 85
        };

        
        Predicate<Student> engineeringEligibility = s => s.Marks >= 60;

        Predicate<Student> medicalEligibility = s => s.Marks >= 70 && s.Age >= 17;

        Predicate<Student> managementEligibility = s => s.Marks >= 55 && s.Attendance >= 75;

        
        EligibilityEngine engine = new EligibilityEngine();

        
        engine.CheckEligibility(student, "Engineering", engineeringEligibility);
        engine.CheckEligibility(student, "Medical", medicalEligibility);
        engine.CheckEligibility(student, "Management", managementEligibility);
    }
}
