using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // UpdateStoreDto - Request for PUT store
    // =====================================
public class UpdateStoreDto
{
        public string? Name { get; set; }
        public string? Description { get; set; }
  
}
