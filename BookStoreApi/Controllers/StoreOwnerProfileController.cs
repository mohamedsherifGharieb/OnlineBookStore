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
    [Authorize]
    public class StoreOwnerProfileController(UserManager<AppUser> userManager, AppDbContext _context) : BaseApiController
    {
        // =====================================
        // GET: api/storeownerprofile
        // Get logged-in store owner's profile
        // =====================================
        [HttpGet]
        public async Task<ActionResult<StoreOwnerProfileDto>> GetMyProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            var profile = await _context.StoreOwnerProfiles
                .Include(s => s.OwnedStore)
                .FirstOrDefaultAsync(s => s.Id == userId);

            if (profile == null)
                return NotFound("Store owner profile not found");

            return Ok(user.ToStoreOwnerProfileDto(profile));
        }

        // =====================================
        // PUT: api/storeownerprofile
        // Update logged-in store owner's profile
        // =====================================
        [HttpPut]
        public async Task<ActionResult> UpdateMyProfile(UpdateStoreOwnerProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if( dto == null || (string.IsNullOrWhiteSpace(dto.BusinessName) && string.IsNullOrWhiteSpace(dto.TaxId)))
                return BadRequest("Invalid profile data");

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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            var profile = await _context.StoreOwnerProfiles
                .Include(s => s.OwnedStore)
                .FirstOrDefaultAsync(s => s.Id == userId);

            if (profile == null)
                return NotFound("Store owner profile not found");

            if (profile.OwnedStore != null)
                return BadRequest("You already have a store. Only one store per owner is allowed.");

            // Check if store name already exists
            var storeNameExists = await _context.Stores
                .AnyAsync(s => s.Name.ToLower() == dto.Name.Trim().ToLower());
            
            if (storeNameExists)
                return BadRequest($"A store with the name '{dto.Name}' already exists. Please choose a different name.");

            var store = new Store
            {
                Id = Guid.NewGuid().ToString(),
                Name = dto.Name.Trim(),
                Description = dto.Description,
                StoreOwnerProfileId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMyStore), new {id = store.Id }, new StoreDto
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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            if( dto == null || (string.IsNullOrWhiteSpace(dto.Name) && string.IsNullOrWhiteSpace(dto.Description)))
                return BadRequest("Invalid store data");

            var store = await _context.Stores
                .FirstOrDefaultAsync(s => s.StoreOwnerProfileId == userId);

            if (store == null)
                return NotFound("No store found");

            // If updating name, check if new name already exists
            if (!string.IsNullOrWhiteSpace(dto.Name))
            {
                var nameExists = await _context.Stores
                    .AnyAsync(s => s.Name.ToLower() == dto.Name.Trim().ToLower() && s.Id != store.Id);

                if (nameExists)
                    return BadRequest($"A store with the name '{dto.Name}' already exists. Please choose a different name.");

                store.Name = dto.Name;
            }

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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

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