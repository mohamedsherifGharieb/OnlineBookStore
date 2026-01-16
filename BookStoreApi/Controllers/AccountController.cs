using System.Security.Cryptography;
using System.Text;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using BookStoreApi.Extensions;
using BookStoreApi.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    public class AccountController(UserManager<AppUser> userManager, ITokenService _tokenService) : BaseApiController
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
            var result = await userManager.CreateAsync(user);
            if (!result.Succeeded)
                return BadRequest("Problem registering user");

            return  user.ToUserDto(_tokenService);
        }

        // =====================================
        // LOGIN
        // =====================================
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
           var user = await userManager.FindByEmailAsync(loginDto.Email.Trim().ToLower());

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
            return  user.ToUserDto(_tokenService);
        }

        // =====================================
        // HELPERS
        // =====================================
        private async Task<bool> UserExists(string email)
        {
            return await userManager.Users
                .AnyAsync(u => u.Email == email.Trim().ToLower());
        }
    }
}
