using System;

namespace BookStoreApi.Entities;

public class OrderItem
{
        public Guid Id { get; set; }
        public Guid BookId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; } // Number of copies purchased
        public float PriceAtPurchase { get; set; } // Price at the time of purchase

        // Navigation properties
        public EBook? Book { get; set; }
        public Order? Order { get; set; }
    
}
