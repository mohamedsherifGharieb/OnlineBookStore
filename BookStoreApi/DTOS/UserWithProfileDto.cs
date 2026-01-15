using System;

namespace BookStoreApi.DTOS;

public class UserWithProfileDto
{
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public BuyerProfileDto? BuyerProfile { get; set; }
        public StoreOwnerProfileDto? StoreOwnerProfile { get; set; }
}
