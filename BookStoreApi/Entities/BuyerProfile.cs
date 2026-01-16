using System.ComponentModel.DataAnnotations;

namespace BookStoreApi.Entities;

public class BuyerProfile
{
    [Key]
    public string Id { get; set; } = null!; // PK = FK to AppUser.Id

    public string ShippingAddress { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public AppUser User { get; set; } = null!;
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
