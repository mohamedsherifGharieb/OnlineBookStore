using System;

namespace BookStoreApi.DTOS;

    // =====================================
    // UpdateBuyerProfileDto - Request for PUT profile
    // =====================================
public class UpdateBuyerProfileDto
{
        public string? ShippingAddress { get; set; }
        public string? PhoneNumber { get; set; }

}
