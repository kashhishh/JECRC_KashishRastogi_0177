using SoftToyHub.Entities;

namespace SoftToyHub.Data
{
    public static class SoftToyStore
    {
        public static List<SoftToy> Toys = new List<SoftToy>
        {
            new SoftToy { Id = 1, Name = "Teddy Bear", Price = 500, Category = "Teddy", Stock = 10, IsAvailable = true },
                
            new  SoftToy { Id = 2, Name = "Bunny", Price = 300, Category = "Animal", Stock = 5, IsAvailable = true }
        };
    }
}