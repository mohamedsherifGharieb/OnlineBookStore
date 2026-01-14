using System.Security.Cryptography;
using System.Text;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using BookStoreApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    public class AccountController(AppDbContext _context, ITokenService _tokenService) : BaseApiController
    {
        // =====================================
        // REGISTER
        // =====================================
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email))
                return BadRequest("Email is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Id = Guid.NewGuid().ToString(),
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email.Trim().ToLower(),
                Role = registerDto.Role,
                PasswordHash = hmac.ComputeHash(
                    Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            // ---------------------------------
            // Create profile (Shared PK)
            // ---------------------------------
            if (user.Role == UserRole.Buyer)
            {
                user.BuyerProfile = new BuyerProfile
                {
                    Id = user.Id
                };
            }
            else if (user.Role == UserRole.StoreOwner)
            {
                user.StoreOwnerProfile = new StoreOwnerProfile
                {
                    Id = user.Id
                };
            }
            else
            {
                return BadRequest("Invalid user role");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Image = user.ImageUrl,
                Token = _tokenService.CreateToken(user)
            };
        }

        // =====================================
        // LOGIN
        // =====================================
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .Include(u => u.BuyerProfile)
                .Include(u => u.StoreOwnerProfile)
                .SingleOrDefaultAsync(u =>
                    u.Email == loginDto.Email.Trim().ToLower());

            if (user == null)
                return Unauthorized("Invalid email");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(
                Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Image = user.ImageUrl,
                Token = _tokenService.CreateToken(user)
            };
        }

        // =====================================
        // HELPERS
        // =====================================
        private async Task<bool> UserExists(string email)
        {
            return await _context.Users
                .AnyAsync(u => u.Email == email.Trim().ToLower());
        }
    }
}
