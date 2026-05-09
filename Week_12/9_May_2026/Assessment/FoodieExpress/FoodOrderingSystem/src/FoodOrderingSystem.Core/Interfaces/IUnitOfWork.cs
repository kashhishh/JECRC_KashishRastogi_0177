namespace FoodOrderingSystem.Core.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IFoodItemRepository FoodItems { get; }
    ICategoryRepository Categories { get; }
    IOrderRepository Orders { get; }
    ICartRepository Carts { get; }
    Task<int> SaveChangesAsync();
}
