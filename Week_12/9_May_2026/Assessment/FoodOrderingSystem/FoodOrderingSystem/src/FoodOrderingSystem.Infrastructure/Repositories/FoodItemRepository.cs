using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingSystem.Infrastructure.Repositories;

public class FoodItemRepository : BaseRepository<FoodItem>, IFoodItemRepository
{
    public FoodItemRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IEnumerable<FoodItem>> GetByCategoryAsync(int categoryId)
        => await _dbSet.Include(f => f.Category)
                       .Where(f => f.CategoryId == categoryId && f.IsAvailable)
                       .ToListAsync();

    public async Task<IEnumerable<FoodItem>> SearchAsync(string searchTerm)
        => await _dbSet.Include(f => f.Category)
                       .Where(f => f.Name.Contains(searchTerm) || f.Description.Contains(searchTerm))
                       .ToListAsync();

    public async Task<IEnumerable<FoodItem>> GetAvailableItemsAsync()
        => await _dbSet.Include(f => f.Category)
                       .Where(f => f.IsAvailable)
                       .OrderBy(f => f.Category.Name)
                       .ToListAsync();

    public async Task<FoodItem?> GetWithCategoryAsync(int id)
        => await _dbSet.Include(f => f.Category)
                       .FirstOrDefaultAsync(f => f.Id == id);
}
