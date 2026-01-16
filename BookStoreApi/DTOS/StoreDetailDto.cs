using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // StoreDetailDto - Response for GET store with books
    // =====================================
public class StoreDetailDto
{
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TotalBooks { get; set; }
        public List<EBookWithStoreDto> Books { get; set; } = new();
   
}
