using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // StoreDto - Response for GET store
    // =====================================
public class StoreDto
{
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

}
