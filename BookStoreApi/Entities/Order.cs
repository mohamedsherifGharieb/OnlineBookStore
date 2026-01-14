using System;
using System.Collections.Generic;

namespace BookStoreApi.Entities;

public class Order
{
    public string Id { get; set; } = string.Empty;
    public required string BuyerProfileId { get; set; } // FK to BuyerProfile (not AppUser directly)
    public required string StoreId { get; set; } // FK to Store
    public decimal TotalAmount { get; set; } 
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedDate { get; set; }
    public DateTime? CancelledDate { get; set; }
    public string? ShippingAddress { get; set; }

    // Navigation properties
    public BuyerProfile Buyer { get; set; } = null!; 
    public Store Store { get; set; } = null!;
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}

public enum OrderStatus
{
    Pending = 1,
    Processing = 2,
    Shipped = 3,
    Delivered = 4,
    Cancelled = 5,
    Refunded = 6
}