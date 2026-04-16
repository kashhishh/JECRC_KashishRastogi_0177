namespace SoftToyHub.Entities
{
    public class SoftToy
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public int Stock { get; set; }
        public bool IsAvailable { get; set; }

        public void UpdateStock(int quantity)
        {
            Stock = quantity;
            IsAvailable = Stock > 0;
        }
    }
}