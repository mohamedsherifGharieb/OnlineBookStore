using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // EBookWithStoreDto - Response for GET ebook with store name
    // =====================================
public class EBookWithStoreDto
{
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string? ISBN { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public string StoreId { get; set; } = string.Empty;
        public string StoreName { get; set; } = string.Empty;
}
