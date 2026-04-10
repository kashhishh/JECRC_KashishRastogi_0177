using SoftToyHub.Attributes;
using SoftToyHub.Attributes;
using System.ComponentModel.DataAnnotations;

namespace SoftToyHub.DTOs
{
    [StockAvailable]
    public class CreateSoftToyDto
    {
        [Required]
        [ToyNameValidation]
        public string Name { get; set; }

        [MinPrice(100)]
        public decimal Price { get; set; }

        [ValidCategory(new string[] { "Teddy", "Animal", "Cartoon" })]
        public string Category { get; set; }

        [Range(0, 1000)]
        public int Stock { get; set; }

        public bool IsAvailable { get; set; }
    }
}