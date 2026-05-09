using FoodOrderingSystem.Core.Entities;

namespace FoodOrderingSystem.Core.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    Task<IEnumerable<Category>> GetActiveAsync();
}
