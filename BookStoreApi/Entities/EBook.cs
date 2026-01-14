using System;

namespace BookStoreApi.Entities;

public class EBook
{ 
    public string Id { get; set; } = string.Empty;
    public required string Title { get; set; }
    public string? ISBN { get; set; }
    public required string Author { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public required string StoreId { get; set; }
    public string? ImageUrl { get; set; }

    // Navigation properties
    public Store Store { get; set; } = null!;
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}