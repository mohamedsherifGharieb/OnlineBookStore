using System;

namespace BookStoreApi.DTOS;

public class OrderItemDto
{
        public string EBookId { get; set; } = string.Empty;
        public string EBookTitle { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Subtotal { get; set; }

}
