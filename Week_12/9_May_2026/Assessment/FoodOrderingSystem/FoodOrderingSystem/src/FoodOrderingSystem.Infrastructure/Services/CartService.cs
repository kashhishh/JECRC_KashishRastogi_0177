using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Core.ViewModels;

namespace FoodOrderingSystem.Infrastructure.Services;

public interface ICartService
{
    Task<CartViewModel> GetCartAsync(string userId);
    Task AddToCartAsync(string userId, int foodItemId, int quantity = 1);
    Task UpdateCartItemAsync(string userId, int cartItemId, int quantity);
    Task RemoveFromCartAsync(string userId, int cartItemId);
    Task ClearCartAsync(string userId);
    Task<int> GetCartItemCountAsync(string userId);
}

public class CartService : ICartService
{
    private readonly IUnitOfWork _unitOfWork;

    public CartService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<CartViewModel> GetCartAsync(string userId)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        if (cart == null) return new CartViewModel();

        return new CartViewModel
        {
            CartId = cart.Id,
            Items = cart.CartItems.Select(ci => new CartItemViewModel
            {
                CartItemId = ci.Id,
                FoodItemId = ci.FoodItemId,
                FoodItemName = ci.FoodItem.Name,
                ImagePath = ci.FoodItem.ImagePath,
                UnitPrice = ci.FoodItem.Price,
                Quantity = ci.Quantity
            }).ToList()
        };
    }

    public async Task AddToCartAsync(string userId, int foodItemId, int quantity = 1)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        if (cart == null)
        {
            cart = new Cart { UserId = userId };
            await _unitOfWork.Carts.AddAsync(cart);
            await _unitOfWork.SaveChangesAsync();
        }

        var existingItem = await _unitOfWork.Carts.GetCartItemAsync(cart.Id, foodItemId);
        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            cart.CartItems.Add(new CartItem
            {
                CartId = cart.Id,
                FoodItemId = foodItemId,
                Quantity = quantity
            });
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task UpdateCartItemAsync(string userId, int cartItemId, int quantity)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        if (cart == null) return;

        var item = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
        if (item == null) return;

        if (quantity <= 0)
        {
            cart.CartItems.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task RemoveFromCartAsync(string userId, int cartItemId)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        if (cart == null) return;

        var item = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
        if (item != null)
        {
            cart.CartItems.Remove(item);
            cart.UpdatedAt = DateTime.UtcNow;
            await _unitOfWork.SaveChangesAsync();
        }
    }

    public async Task ClearCartAsync(string userId)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        if (cart == null) return;

        cart.CartItems.Clear();
        cart.UpdatedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<int> GetCartItemCountAsync(string userId)
    {
        var cart = await _unitOfWork.Carts.GetCartWithItemsAsync(userId);
        return cart?.CartItems.Sum(ci => ci.Quantity) ?? 0;
    }
}
