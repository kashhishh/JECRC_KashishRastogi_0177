using FoodOrderingSystem.Core.Entities;

namespace FoodOrderingSystem.Core.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<IEnumerable<Order>> GetUserOrdersAsync(string userId);
    Task<Order?> GetOrderWithDetailsAsync(int orderId);
    Task<IEnumerable<Order>> GetAllWithDetailsAsync();
}
