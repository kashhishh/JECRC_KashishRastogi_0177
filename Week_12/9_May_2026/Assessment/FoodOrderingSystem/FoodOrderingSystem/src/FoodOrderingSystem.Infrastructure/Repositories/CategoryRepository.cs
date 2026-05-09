using FoodOrderingSystem.Core.Entities;
using FoodOrderingSystem.Core.Interfaces;
using FoodOrderingSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrderingSystem.Infrastructure.Repositories;

public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IEnumerable<Category>> GetActiveAsync()
        => await _dbSet.Where(c => c.IsActive).OrderBy(c => c.Name).ToListAsync();
}
