using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingSystem.Infrastructure.Repositories;

public class CartRepository : BaseRepository<Cart>, ICartRepository
{
    public CartRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Cart?> GetCartWithItemsAsync(string userId)
        => await _dbSet.Include(c => c.CartItems)
                       .ThenInclude(ci => ci.FoodItem)
                       .FirstOrDefaultAsync(c => c.UserId == userId);

    public async Task<CartItem?> GetCartItemAsync(int cartId, int foodItemId)
        => await _context.CartItems
                         .FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.FoodItemId == foodItemId);
}
