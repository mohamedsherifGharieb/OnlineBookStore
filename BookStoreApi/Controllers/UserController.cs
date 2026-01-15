using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    public class UsersController(AppDbContext context) : BaseApiController
    {
        
        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<UserWithProfileDto>>> GetUsers()
        {
            var users = await context.Users
                .Include(u => u.BuyerProfile)
                .Include(u => u.StoreOwnerProfile)
                .AsNoTracking()
                .ToListAsync();

            var userDtos = users.Select(u => new UserWithProfileDto
            {
                Id = u.Id,
                Email = u.Email,
                DisplayName = u.DisplayName,
                ImageUrl = u.ImageUrl,
                Role = u.Role.ToString(),
                CreatedAt = u.CreatedAt,
                BuyerProfile = u.BuyerProfile != null ? new BuyerProfileDto
                {
                    Id = u.BuyerProfile.Id,
                    DisplayName = u.DisplayName,
                    Email = u.Email,
                    ShippingAddress = u.BuyerProfile.ShippingAddress,
                    PhoneNumber = u.BuyerProfile.PhoneNumber
                } : null,
                StoreOwnerProfile = u.StoreOwnerProfile != null ? new StoreOwnerProfileDto
                {
                    Id = u.StoreOwnerProfile.Id,
                    DisplayName = u.DisplayName,
                    Email = u.Email,
                    BusinessName = u.StoreOwnerProfile.BusinessName,
                    TaxId = u.StoreOwnerProfile.TaxId,
                    StoreId = null,
                    StoreName = null
                } : null
            }).ToList();

            return Ok(userDtos);
        }

        // GET: api/users/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserWithProfileDto>> GetUser(string id)
        {
            var user = await context.Users
                .Include(u => u.BuyerProfile)
                .Include(u => u.StoreOwnerProfile)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound();

            var userDto = new UserWithProfileDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                ImageUrl = user.ImageUrl,
                Role = user.Role.ToString(),
                CreatedAt = user.CreatedAt,
                BuyerProfile = user.BuyerProfile != null ? new BuyerProfileDto
                {
                    Id = user.BuyerProfile.Id,
                    DisplayName = user.DisplayName,
                    Email = user.Email,
                    ShippingAddress = user.BuyerProfile.ShippingAddress,
                    PhoneNumber = user.BuyerProfile.PhoneNumber
                } : null,
                StoreOwnerProfile = user.StoreOwnerProfile != null ? new StoreOwnerProfileDto
                {
                    Id = user.StoreOwnerProfile.Id,
                    DisplayName = user.DisplayName,
                    Email = user.Email,
                    BusinessName = user.StoreOwnerProfile.BusinessName,
                    TaxId = user.StoreOwnerProfile.TaxId,
                    StoreId = null,
                    StoreName = null
                } : null
            };

            return Ok(userDto);
        }

        // POST: api/users - Should not be used, use /api/account/register instead
        [HttpPost]
        public ActionResult CreateUser()
        {
            return BadRequest("Use /api/account/register to create users");
        }

        // PUT: api/users/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UpdateUserDto updateDto)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            // SAFE updates only
            if (!string.IsNullOrWhiteSpace(updateDto.DisplayName))
                user.DisplayName = updateDto.DisplayName;
            
            if (!string.IsNullOrWhiteSpace(updateDto.ImageUrl))
                user.ImageUrl = updateDto.ImageUrl;

            await context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}