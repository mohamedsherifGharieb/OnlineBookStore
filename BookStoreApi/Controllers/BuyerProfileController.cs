using System.Security.Claims;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using BookStoreApi.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    [Authorize] // All endpoints require authentication
    public class BuyerProfileController(UserManager<AppUser> userManager,
    AppDbContext _context) : BaseApiController
    {

        // =====================================
        // GET: api/buyerprofile
        // Get logged-in buyer's profile
        // =====================================
        [HttpGet]
        public async Task<ActionResult<BuyerProfileDto>> GetMyProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            var profile = await _context.BuyerProfiles
                .FirstOrDefaultAsync(b => b.Id == userId);

            if (profile == null)
                return NotFound("Buyer profile not found");

            return Ok(user.ToBuyerProfileDto(profile));
        }

        // =====================================
        // PUT: api/buyerprofile
        // Update logged-in buyer's profile
        // =====================================
        [HttpPut]
        public async Task<ActionResult> UpdateMyProfile(UpdateBuyerProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (dto == null || (string.IsNullOrWhiteSpace(dto.ShippingAddress) && string.IsNullOrWhiteSpace(dto.PhoneNumber)))
                return BadRequest("Invalid profile data");

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var profile = await _context.BuyerProfiles
                .FirstOrDefaultAsync(b => b.Id == userId);

            if (profile == null)
                return NotFound("Buyer profile not found");

            // Update only provided fields
            if (!string.IsNullOrWhiteSpace(dto.ShippingAddress))
                profile.ShippingAddress = dto.ShippingAddress;

            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
                profile.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // =====================================
        // GET: api/buyerprofile/orders
        // Get all orders for logged-in buyer
        // =====================================
        [HttpGet("orders")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetMyOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var orderDtos = await _context.Orders
                 .Where(o => o.BuyerProfileId == userId)
                 .OrderByDescending(o => o.OrderDate)
                 .Select(o => new OrderDto
                {
                    Id = o.Id,
                    StoreName = o.Store.Name,
                    TotalAmount = o.TotalAmount,
                    Status = o.Status.ToString(),
                    OrderDate = o.OrderDate,
                    CompletedDate = o.CompletedDate,
                    CancelledDate = o.CancelledDate,
                    ShippingAddress = o.ShippingAddress,
                    Items = o.OrderItems.Select(oi => new OrderItemDto
                        {
                            EBookId = oi.EBookId,
                            EBookTitle = oi.EBook.Title,
                            Quantity = oi.Quantity,
                            UnitPrice = oi.UnitPrice,
                            Subtotal = oi.Subtotal
                        }).ToList()})
                    .ToListAsync();
            return Ok(orderDtos);
        }
   
     }
}