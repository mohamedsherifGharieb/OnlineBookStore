using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // CreateOrderItemDto - Items inside CreateOrderDto
    // =====================================
public class CreateOrderItemDto
{
        public required string EBookId { get; set; }
        public int Quantity { get; set; }
}
