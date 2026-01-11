using System;

namespace BookStoreApi.Entities;

public class EBook
{ 
         public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Title { get; set; }
        public string? ISBN { get; set; } // Same ISBN can exist in multiple stores
        public string? Author { get; set; }
        public string? Description { get; set; }
        public float Price { get; set; }
        public int StockQuantity { get; set; }
        public required string StoreId { get; set; }
        public string? ImageUrl { get; set; }


        // Navigation properties
        /*public Store? Store { get; set; } // Book belongs to one store
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Track all purchases*/
        
    }
