using System.Security.Claims;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    [Authorize]
    public class StoreOwnerProfileController(AppDbContext _context) : BaseApiController
    {
        // =====================================
        // GET: api/storeownerprofile
        // Get logged-in store owner's profile
        // =====================================
        [HttpGet]
        public async Task<ActionResult<StoreOwnerProfileDto>> GetMyProfile()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var profile = await _context.StoreOwnerProfiles
                .Include(s => s.OwnedStore)
                .FirstOrDefaultAsync(s => s.Id == userId);

            if (profile == null)
                return NotFound("Store owner profile not found");

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound("User not found");

            return Ok(new StoreOwnerProfileDto
            {
                Id = profile.Id,
                DisplayName = user.DisplayName,
                Email = user.Email,
                BusinessName = profile.BusinessName,
                TaxId = profile.TaxId,
                StoreId = profile.OwnedStore?.Id,
                StoreName = profile.OwnedStore?.Name
            });
        }

        // =====================================
        // PUT: api/storeownerprofile
        // Update logged-in store owner's profile
        // =====================================
        [HttpPut]
        public async Task<ActionResult> UpdateMyProfile(UpdateStoreOwnerProfileDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var profile = await _context.StoreOwnerProfiles
                .FirstOrDefaultAsync(s => s.Id == userId);

            if (profile == null)
                return NotFound("Store owner profile not found");

            // Update only provided fields
            if (!string.IsNullOrWhiteSpace(dto.BusinessName))
                profile.BusinessName = dto.BusinessName;

            if (!string.IsNullOrWhiteSpace(dto.TaxId))
                profile.TaxId = dto.TaxId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // =====================================
        // POST: api/storeownerprofile/store
        // Create a store (Store owner can only have one store)
        // =====================================
        [HttpPost("store")]
        public async Task<ActionResult<StoreDto>> CreateStore(CreateStoreDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var profile = await _context.StoreOwnerProfiles
                .Include(s => s.OwnedStore)
                .FirstOrDefaultAsync(s => s.Id == userId);

            if (profile == null)
                return NotFound("Store owner profile not found");

            if (profile.OwnedStore != null)
                return BadRequest("You already have a store. Only one store per owner is allowed.");

            var store = new Store
            {
                Id = Guid.NewGuid().ToString(),
                Name = dto.Name,
                Description = dto.Description,
                StoreOwnerProfileId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMyStore), null, new StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Description = store.Description,
                CreatedAt = store.CreatedAt
            });
        }

        // =====================================
        // GET: api/storeownerprofile/store
        // Get logged-in store owner's store
        // =====================================
        [HttpGet("store")]
        public async Task<ActionResult<StoreDto>> GetMyStore()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var store = await _context.Stores
                .FirstOrDefaultAsync(s => s.StoreOwnerProfileId == userId);

            if (store == null)
                return NotFound("No store found. Create one first.");

            return Ok(new StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Description = store.Description,
                CreatedAt = store.CreatedAt
            });
        }

        // =====================================
        // PUT: api/storeownerprofile/store
        // Update logged-in store owner's store
        // =====================================
        [HttpPut("store")]
        public async Task<ActionResult> UpdateMyStore(UpdateStoreDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var store = await _context.Stores
                .FirstOrDefaultAsync(s => s.StoreOwnerProfileId == userId);

            if (store == null)
                return NotFound("No store found");

            if (!string.IsNullOrWhiteSpace(dto.Name))
                store.Name = dto.Name;

            if (!string.IsNullOrWhiteSpace(dto.Description))
                store.Description = dto.Description;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // =====================================
        // DELETE: api/storeownerprofile/store
        // Delete logged-in store owner's store
        // =====================================
        [HttpDelete("store")]
        public async Task<ActionResult> DeleteMyStore()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var store = await _context.Stores
                .Include(s => s.Books)
                .Include(s => s.Orders)
                .FirstOrDefaultAsync(s => s.StoreOwnerProfileId == userId);

            if (store == null)
                return NotFound("No store found");

            if (store.Orders.Any(o => o.Status != OrderStatus.Delivered && o.Status != OrderStatus.Cancelled))
                return BadRequest("Cannot delete store with pending orders");

            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}