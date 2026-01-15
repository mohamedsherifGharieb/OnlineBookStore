using System;

namespace BookStoreApi.DTOS;
    // =====================================
    // CreateEBookDto - Request for POST ebook
    // =====================================
public class CreateEBookDto
{
        public required string Title { get; set; }
        public string? ISBN { get; set; }
        public required string Author { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public required string StoreId { get; set; }
        public string? ImageUrl { get; set; }
}
