using System;
using System.Threading.Tasks;

public class AsyncService
{
    public int requestCount { get; set; }
    public long lastResponseTime { get; set; }

    public AsyncService()
    {
        requestCount = 0;
        lastResponseTime = 0;
    }

    // Virtual async method
    public virtual async Task<string> FetchDataAsync(string endpoint)
    {
        await Task.Delay(2000);
        return "Base Service Fetch";
    }

    // Virtual async status method
    public virtual async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        return $"Requests:{requestCount}";
    }
}

public class WeatherService : AsyncService
{
    public string city { get; set; }
    public int temperature { get; set; }

    public WeatherService(string cityName)
    {
        city = cityName;
        temperature = 22;
    }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine($"Weather Fetch Started,{city}");

        await Task.Delay(2000);

        string result =
            $"Weather Data Received,{city},{temperature}°C";

        Console.WriteLine(result);

        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        string status =
            $"Weather Service Status,Requests:{requestCount}";

        Console.WriteLine(status);

        return status;
    }
}

public class StockService : AsyncService
{
    public string symbol { get; set; }
    public double currentPrice { get; set; }

    public StockService(string stockSymbol)
    {
        symbol = stockSymbol;
        currentPrice = 154.75;
    }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine($"Stock Fetch Started,{symbol}");

        await Task.Delay(2000);

        string result =
            $"Stock Price Update,{symbol},${currentPrice}";

        Console.WriteLine(result);

        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(100);

        string status =
            $"Stock Service Status,Requests:{requestCount}";

        Console.WriteLine(status);

        return status;
    }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        string serviceType = Console.ReadLine()?.Trim() ?? "";
        string identifier = Console.ReadLine()?.Trim() ?? "";
        string command = Console.ReadLine()?.Trim() ?? "";

        if (serviceType.Equals("Weather", StringComparison.OrdinalIgnoreCase))
        {
            WeatherService weatherService =
                new WeatherService(identifier);

            if (command.Equals("FetchDataAsync",
                StringComparison.OrdinalIgnoreCase))
            {
                await weatherService.FetchDataAsync(identifier);
            }
            else if (command.Equals("GetStatusAsync",
                StringComparison.OrdinalIgnoreCase))
            {
                await weatherService.GetStatusAsync();
            }
            else
            {
                Console.WriteLine("Invalid Command");
            }
        }
        else if (serviceType.Equals("Stock",
            StringComparison.OrdinalIgnoreCase))
        {
            StockService stockService =
                new StockService(identifier);

            if (command.Equals("FetchDataAsync",
                StringComparison.OrdinalIgnoreCase))
            {
                await stockService.FetchDataAsync(identifier);
            }
            else if (command.Equals("GetStatusAsync",
                StringComparison.OrdinalIgnoreCase))
            {
                await stockService.GetStatusAsync();
            }
            else
            {
                Console.WriteLine("Invalid Command");
            }
        }
        else
        {
            Console.WriteLine("Invalid Service Type");
        }
    }
}