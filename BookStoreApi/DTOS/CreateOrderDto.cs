using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // CreateOrderDto - Request for POST order
    // =====================================
public class CreateOrderDto
{
        public required string StoreId { get; set; }
        public string? ShippingAddress { get; set; }
        public List<CreateOrderItemDto> Items { get; set; } = new();
}
