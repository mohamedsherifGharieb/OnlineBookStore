using System.ComponentModel.DataAnnotations;

namespace BookStoreApi.Entities;

public class StoreOwnerProfile
{
    [Key]
    public string Id { get; set; } = null!; // PK = FK to AppUser.Id

    public string? BusinessName { get; set; }
    public string? TaxId { get; set; }

    // Navigation
    public AppUser User { get; set; } = null!;
    public Store? OwnedStore { get; set; }
}
