using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Infrastructure.Data;

namespace FoodOrderingSystem.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public IFoodItemRepository FoodItems { get; }
    public ICategoryRepository Categories { get; }
    public IOrderRepository Orders { get; }
    public ICartRepository Carts { get; }

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        FoodItems = new FoodItemRepository(context);
        Categories = new CategoryRepository(context);
        Orders = new OrderRepository(context);
        Carts = new CartRepository(context);
    }

    public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();
}
