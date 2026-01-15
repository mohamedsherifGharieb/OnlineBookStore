using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // CreateStoreDto - Request for POST store
    // =====================================
public class CreateStoreDto
{
        public required string Name { get; set; }
        public string? Description { get; set; }

}
