using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // EBookDto - Response for EBook data
    // =====================================
public class EBookDto
{
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string? ISBN { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }

}
