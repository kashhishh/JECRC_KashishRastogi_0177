using FoodOrderingSystem.Core.Entities;

namespace FoodOrderingSystem.Core.Interfaces;

public interface IFoodItemRepository : IRepository<FoodItem>
{
    Task<IEnumerable<FoodItem>> GetByCategoryAsync(int categoryId);
    Task<IEnumerable<FoodItem>> SearchAsync(string searchTerm);
    Task<IEnumerable<FoodItem>> GetAvailableItemsAsync();
    Task<FoodItem?> GetWithCategoryAsync(int id);
}
