using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Models;
using ProductManagement.Repository.Interface;

namespace ProductManagement.Repository.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        // ✅ CREATE
        public async Task<int> CreateAsync(ProductRequestDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                CategoryId = dto.CategoryId,

                Detail = new ProductDetail
                {
                    Description = dto.Description
                },

                ProductTags = dto.TagIds.Select(tagId => new ProductTag
                {
                    TagId = tagId
                }).ToList()
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product.Id;
        }

        // ✅ DELETE
        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.ProductTags)
                .Include(p => p.Detail)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            // Remove related data first (safe practice)
            _context.ProductTags.RemoveRange(product.ProductTags);

            if (product.Detail != null)
                _context.ProductDetails.Remove(product.Detail);

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();
            return true;
        }

        // ✅ GET ALL (Already correct)
        public async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Detail)
                .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    CategoryName = p.Category.Name,
                    Description = p.Detail.Description,
                    Tags = p.ProductTags.Select(pt => pt.Tag.Name).ToList()
                }).ToListAsync();
        }

        // ✅ GET BY ID (Already correct)
        public async Task<ProductRequestDto> GetByIdAsync(int id)
        {
            var p = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Detail)
                .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (p == null)
                return null;

            return new ProductRequestDto
            {
                Name = p.Name,
                Price = p.Price,
                CategoryId = p.CategoryId,
                Description = p.Detail.Description,
                TagIds = p.ProductTags.Select(pt => pt.TagId).ToList()
            };
        }

        // ✅ UPDATE
        public async Task<bool> UpdateAsync(int id, ProductRequestDto dto)
        {
            var product = await _context.Products
                .Include(p => p.Detail)
                .Include(p => p.ProductTags)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            // Update basic fields
            product.Name = dto.Name;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;
            

            // Update Detail
            if (product.Detail != null)
            {
                product.Detail.Description = dto.Description;
            }
            else
            {
                product.Detail = new ProductDetail
                {
                    Description = dto.Description
                };
            }

            // Update Tags (Many-to-Many)
            _context.ProductTags.RemoveRange(product.ProductTags);

            product.ProductTags = dto.TagIds.Select(tagId => new ProductTag
            {
                ProductId = id,
                TagId = tagId
            }).ToList();

            await _context.SaveChangesAsync();
            return true;
        }
    }
}