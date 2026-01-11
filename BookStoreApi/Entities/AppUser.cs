using System;

namespace BookStoreApi.Entities;

public class AppUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? DisplayName { get; set; }
        public required string Email { get; set; } 

        public required byte[]? PasswordHash { get; set; }
        public required byte[]? PasswordSalt { get; set; }
        
        public string? ImageUrl { get; set; }
       /* public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }

        // Navigation properties
        public Store? OwnedStore { get; set; } // One-to-One: User can own only ONE store
        public ICollection<Order> Orders { get; set; } = new List<Order>(); // Orders as buyer */
    }