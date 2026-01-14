using System;

namespace BookStoreApi.Entities;

public class AppUser
{
    public string Id { get; set; } = string.Empty;
    public required string Email { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }
    public required UserRole Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    // Composition - only one will be populated
    public StoreOwnerProfile? StoreOwnerProfile { get; set; }
    public BuyerProfile? BuyerProfile { get; set; }
}
public enum UserRole
{
    Buyer = 1,
    StoreOwner = 2
}