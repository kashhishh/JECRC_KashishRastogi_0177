using FoodOrderingSystem.Core.Entities;

namespace FoodOrderingSystem.Core.Interfaces;

public interface ICartRepository : IRepository<Cart>
{
    Task<Cart?> GetCartWithItemsAsync(string userId);
    Task<CartItem?> GetCartItemAsync(int cartId, int foodItemId);
}
