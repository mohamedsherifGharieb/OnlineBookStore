using System;
using System.ComponentModel.DataAnnotations;

namespace BookStoreApi.DTOS;

    // =====================================
    // BuyerProfileDto - Response for GET profile
    // =====================================
public class BuyerProfileDto
{
        public string Id { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(4)]
        public string ShippingAddress { get; set; } = string.Empty;
        [Required]
        [MinLength(12)]
        public string? PhoneNumber { get; set; }
}
