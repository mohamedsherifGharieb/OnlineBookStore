using System;

namespace BookStoreApi.Entities;

    public class Store
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public Guid OwnerId { get; set; }

        // Navigation properties
        public AppUser? Owner { get; set; } // One-to-One with AppUser
        public ICollection<EBook> Books { get; set; } = new List<EBook>(); // Store has many books
        public ICollection<Order> Orders { get; set; } = new List<Order>(); // Orders received by this store
    }
