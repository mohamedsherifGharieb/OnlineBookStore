using System;

namespace BookStoreApi.DTOS;


    // =====================================
    // StoreOwnerProfileDto - Response for GET profile
    // =====================================
public class StoreOwnerProfileDto
{
        public string Id { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? BusinessName { get; set; }
        public string? TaxId { get; set; }
        public string? StoreId { get; set; }
        public string? StoreName { get; set; }

}
