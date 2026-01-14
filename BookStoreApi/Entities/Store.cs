using System;

namespace BookStoreApi.Entities;

public class Store
{
    public string Id { get; set; } = string.Empty;
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required string StoreOwnerProfileId { get; set; } // FK to StoreOwnerProfile
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Navigation properties
    public StoreOwnerProfile Owner { get; set; } = null!;
    public ICollection<EBook> Books { get; set; } = new List<EBook>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}