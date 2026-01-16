using System;
using System.ComponentModel.DataAnnotations;

namespace BookStoreApi.DTOS;

    // =====================================
    // StoreDto - Response for GET store
    // =====================================
public class StoreDto
{
        public string Id { get; set; } = string.Empty;

        [Required]
        [MinLength(5)]
        public  string Name { get; set; } = string.Empty;

        [Required]
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

}
