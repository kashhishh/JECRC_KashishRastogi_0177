using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // ------------------------------------------------
        // Student Data
        // ------------------------------------------------
        Dictionary<string, int[]> students =
            new Dictionary<string, int[]>();

        students["John"] = new int[] { 85, 90, 78, 92 };
        students["Sarah"] = new int[] { 95, 88, 91, 89 };
        students["Mike"] = new int[] { 70, 65, 80, 75 };
        students["Emma"] = new int[] { 88, 92, 94, 96 };

        // ------------------------------------------------
        // Variables for Top Performer
        // ------------------------------------------------
        string topStudent = "";
        double highestAverage = 0;

        // ------------------------------------------------
        // HashSet for Unique Grades
        // ------------------------------------------------
        HashSet<int> uniqueGrades =
            new HashSet<int>();

        // ------------------------------------------------
        // Students with all grades >= 80
        // ------------------------------------------------
        List<string> excellentStudents =
            new List<string>();

        // ------------------------------------------------
        // OUTPUT HEADER
        // ------------------------------------------------
        Console.WriteLine("--- Student Grade Report ---\n");

        // ------------------------------------------------
        // Process Each Student
        // ------------------------------------------------
        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            // Average
            double average = grades.Average();

            // Highest Grade
            int highest = grades.Max();

            // Lowest Grade
            int lowest = grades.Min();

            // Print Student Report
            Console.WriteLine(
                name +
                ": Average = " +
                average.ToString("0.00") +
                ", Highest = " + highest +
                ", Lowest = " + lowest
            );

            // --------------------------------------------
            // Top Performer Logic
            // --------------------------------------------
            if (average > highestAverage)
            {
                highestAverage = average;
                topStudent = name;
            }

            // --------------------------------------------
            // Check all grades >= 80
            // --------------------------------------------
            bool allAbove80 = true;

            foreach (int grade in grades)
            {
                // Add to unique grade set
                uniqueGrades.Add(grade);

                if (grade < 80)
                {
                    allAbove80 = false;
                }
            }

            // Store excellent students
            if (allAbove80)
            {
                excellentStudents.Add(
                    name + " (" +
                    string.Join(",", grades) + ")"
                );
            }
        }

        // ------------------------------------------------
        // Top Performer Output
        // ------------------------------------------------
        Console.WriteLine(
            "\nTop Performer: " +
            topStudent +
            " (Average: " +
            highestAverage.ToString("0.00") + ")"
        );

        // ------------------------------------------------
        // Students with all grades >= 80
        // ------------------------------------------------
        Console.WriteLine(
            "\nStudents with all grades >= 80:\n"
        );

        foreach (string student in excellentStudents)
        {
            Console.WriteLine(student);
        }

        // ------------------------------------------------
        // Unique Grades
        // ------------------------------------------------
        Console.WriteLine(
            "\nUnique Grade Values Across All Students:\n"
        );

        var sortedGrades =
            uniqueGrades.OrderBy(x => x);

        Console.WriteLine(
            string.Join(",", sortedGrades)
        );

        Console.WriteLine(
            "\nTotal unique grades: " +
            uniqueGrades.Count
        );
    }
}