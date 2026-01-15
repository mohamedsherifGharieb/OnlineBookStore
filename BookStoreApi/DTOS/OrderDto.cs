using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // OrderDto - Response for GET orders
    // =====================================
public class OrderDto
{
        public string Id { get; set; } = string.Empty;
        public string StoreName { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public DateTime? CancelledDate { get; set; }
        public string? ShippingAddress { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();

}
