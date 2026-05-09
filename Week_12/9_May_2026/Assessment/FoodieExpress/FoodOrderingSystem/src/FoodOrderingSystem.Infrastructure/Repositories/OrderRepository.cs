using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingSystem.Infrastructure.Repositories;

public class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    public OrderRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IEnumerable<Order>> GetUserOrdersAsync(string userId)
        => await _dbSet.Include(o => o.OrderItems)
                       .ThenInclude(oi => oi.FoodItem)
                       .Where(o => o.UserId == userId)
                       .OrderByDescending(o => o.OrderedAt)
                       .ToListAsync();

    public async Task<Order?> GetOrderWithDetailsAsync(int orderId)
        => await _dbSet.Include(o => o.User)
                       .Include(o => o.OrderItems)
                       .ThenInclude(oi => oi.FoodItem)
                       .FirstOrDefaultAsync(o => o.Id == orderId);

    public async Task<IEnumerable<Order>> GetAllWithDetailsAsync()
        => await _dbSet.Include(o => o.User)
                       .Include(o => o.OrderItems)
                       .ThenInclude(oi => oi.FoodItem)
                       .OrderByDescending(o => o.OrderedAt)
                       .ToListAsync();
}
