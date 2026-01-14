using System;

namespace BookStoreApi.Entities;

public class OrderItem
{
    public string Id { get; set; } = string.Empty;
    public required string OrderId { get; set; } // FK to Order
    public required string EBookId { get; set; } // FK to EBook 
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; } 
    public decimal Subtotal { get; set; } // Quantity * UnitPrice (calculated field)

    // Navigation properties
    public Order Order { get; set; } = null!;
    public EBook EBook { get; set; } = null!; 
}