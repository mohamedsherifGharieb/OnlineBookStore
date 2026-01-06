using System;

namespace BookStoreApi.Entities;

public class AppUser
    {
        public Guid Id { get; set; }
        public string? DisplayName { get; set; }
        public string? ImageUrl { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }

        // Navigation properties
        public Store? OwnedStore { get; set; } // One-to-One: User can own only ONE store
        public ICollection<Order> Orders { get; set; } = new List<Order>(); // Orders as buyer
    }