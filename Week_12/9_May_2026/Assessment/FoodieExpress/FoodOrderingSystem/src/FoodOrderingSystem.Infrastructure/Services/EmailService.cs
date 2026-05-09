using Microsoft.Extensions.Logging;

namespace FoodOrderingSystem.Infrastructure.Services;

public interface IEmailService
{
    Task SendPasswordResetEmailAsync(string email, string resetLink);
    Task SendOrderConfirmationAsync(string email, int orderId, decimal total);
}

public class MockEmailService : IEmailService
{
    private readonly ILogger<MockEmailService> _logger;

    public MockEmailService(ILogger<MockEmailService> logger)
    {
        _logger = logger;
    }

    public Task SendPasswordResetEmailAsync(string email, string resetLink)
    {
        _logger.LogInformation("[MOCK EMAIL] Password reset link for {Email}: {Link}", email, resetLink);
        return Task.CompletedTask;
    }

    public Task SendOrderConfirmationAsync(string email, int orderId, decimal total)
    {
        _logger.LogInformation("[MOCK EMAIL] Order #{OrderId} confirmed for {Email}. Total: {Total:C}", orderId, email, total);
        return Task.CompletedTask;
    }
}
