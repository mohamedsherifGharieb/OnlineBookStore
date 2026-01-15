using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // UpdateOrderStatusDto - Request for PUT order status
    // =====================================
public class UpdateOrderStatusDto
{
    public required string Status { get; set; } // "Pending", "Processing", "Shipped", "Delivered", "Cancelled"

}
