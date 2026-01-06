using System;
using System.Collections.Generic;

namespace BookStoreApi.Entities;

public class Order
{        public Guid Id { get; set; }
        public string Status { get; set; } = "Pending"; // "Pending", "Completed", "Cancelled"
        public float TotalPrice { get; set; }
        public Guid BuyerId { get; set; } // Customer who placed the order
        public Guid StoreId { get; set; } // Store where order was placed
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public AppUser? Buyer { get; set; } // Customer
        public Store? Store { get; set; } // Store handling the order
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Items in this order
    
}
