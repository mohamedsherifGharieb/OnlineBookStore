using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // UpdateStoreOwnerProfileDto - Request for PUT profile
    // =====================================
public class UpdateStoreOwnerProfileDto
{
        public string? BusinessName { get; set; }
        public string? TaxId { get; set; }
   
}
