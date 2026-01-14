using System.Security.Claims;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    [Authorize] // All endpoints require authentication
    public class BuyerProfileController(AppDbContext _context) : BaseApiController
    {
       
        // =====================================
        // GET: api/buyerprofile
        // Get logged-in buyer's profile
        // =====================================
       [HttpGet]
        public async Task<ActionResult<BuyerProfileDto>> GetMyProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var profile = await _context.BuyerProfiles
                .FirstOrDefaultAsync(b => b.Id == userId);

            if (profile == null)
                return NotFound("Buyer profile not found");

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound("User not found");

            return Ok(new BuyerProfileDto
            {
                Id = profile.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                ShippingAddress = profile.ShippingAddress,
                PhoneNumber = profile.PhoneNumber
            });
        }
        // =====================================
        // PUT: api/buyerprofile
        // Update logged-in buyer's profile
        // =====================================
        [HttpPut]
        public async Task<ActionResult> UpdateMyProfile(UpdateBuyerProfileDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var orders = await _context.Orders
                .Include(o => o.Store)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.EBook)
                .Where(o => o.BuyerProfileId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var orderDtos = orders.Select(o => new OrderDto
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
                }).ToList()
            }).ToList();

            return Ok(orderDtos);
        }
    }
}