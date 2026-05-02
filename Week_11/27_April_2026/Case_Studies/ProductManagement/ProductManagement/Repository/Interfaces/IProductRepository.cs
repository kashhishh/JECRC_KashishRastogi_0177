using ProductManagement.Repository.Implementations;
using ProductManagement.DTOs;
namespace ProductManagement.Repository.Interface
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductResponseDto>> GetAllAsync();
        Task<ProductRequestDto> GetByIdAsync(int id);
        Task<int> CreateAsync(ProductRequestDto dto);
        Task<bool> UpdateAsync(int id, ProductRequestDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
