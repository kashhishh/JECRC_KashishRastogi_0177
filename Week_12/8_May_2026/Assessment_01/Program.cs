using System;
using System.Collections.Generic;
using System.Linq;

public class Query
{
    public List<int> dataSource { get; set; }
    public bool isExecuted { get; set; }

    public Query(List<int> data)
    {
        dataSource = data;
        isExecuted = false;
    }

    // Deferred execution
    public virtual IEnumerable<int> Apply()
    {
        return dataSource;
    }

    // Force execution
    public virtual List<int> Execute()
    {
        isExecuted = true;
        return Apply().ToList();
    }

    public virtual string GetQueryType()
    {
        return "Base Query";
    }
}

public class FilterQuery : Query
{
    public string predicate { get; set; }
    public int filteredCount { get; set; }

    public FilterQuery(List<int> data, string pred) : base(data)
    {
        predicate = pred;
    }

    public override IEnumerable<int> Apply()
    {
        IEnumerable<int> result = dataSource;

        if (predicate.StartsWith(">"))
        {
            int value = int.Parse(predicate.Substring(1));
            result = dataSource.Where(x => x > value);
        }
        else if (predicate.StartsWith("<"))
        {
            int value = int.Parse(predicate.Substring(1));
            result = dataSource.Where(x => x < value);
        }
        else if (predicate.ToLower() == "even")
        {
            result = dataSource.Where(x => x % 2 == 0);
        }
        else if (predicate.ToLower() == "odd")
        {
            result = dataSource.Where(x => x % 2 != 0);
        }

        return result;
    }

    public override List<int> Execute()
    {
        List<int> result = Apply().ToList();

        filteredCount = result.Count;
        isExecuted = true;

        Console.WriteLine(
            $"Filter Executed,Predicate:{predicate},Result Count:{filteredCount}"
        );

        return result;
    }

    public override string GetQueryType()
    {
        return "Filter Query";
    }
}

public class AggregateQuery : Query
{
    public string operation { get; set; }
    public double result { get; set; }

    public AggregateQuery(List<int> data, string op) : base(data)
    {
        operation = op;
    }

    public override IEnumerable<int> Apply()
    {
        // Deferred execution simulation
        return dataSource;
    }

    public override List<int> Execute()
    {
        List<int> data = Apply().ToList();

        switch (operation.ToLower())
        {
            case "sum":
                result = data.Sum();
                break;

            case "average":
                result = data.Average();
                break;

            case "max":
                result = data.Max();
                break;

            case "min":
                result = data.Min();
                break;

            default:
                Console.WriteLine("Invalid Operation");
                break;
        }

        isExecuted = true;

        Console.WriteLine(
            $"Aggregation Executed,Operation:{operation},Result:{result}"
        );

        return data;
    }

    public override string GetQueryType()
    {
        return "Aggregate Query";
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        // Safe input handling
        string queryType = Console.ReadLine()?.Trim() ?? "";

        List<int> data = (Console.ReadLine() ?? "")
                            .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                            .Select(int.Parse)
                            .ToList();

        string input = Console.ReadLine()?.Trim() ?? "";

        // Query execution
        if (queryType.Equals("Filter", StringComparison.OrdinalIgnoreCase))
        {
            FilterQuery filterQuery = new FilterQuery(data, input);
            filterQuery.Execute();
        }
        else if (queryType.Equals("Aggregate", StringComparison.OrdinalIgnoreCase))
        {
            AggregateQuery aggregateQuery = new AggregateQuery(data, input);
            aggregateQuery.Execute();
        }
        else
        {
            Console.WriteLine("Invalid Query Type");
        }
    }
}