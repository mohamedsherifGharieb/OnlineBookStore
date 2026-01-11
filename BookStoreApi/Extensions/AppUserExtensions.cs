using System;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using BookStoreApi.Interfaces;

namespace BookStoreApi.Extensions;

public static class AppUserExtensions
{
 public static UserDto ToUserDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = tokenService.CreateToken(user)
        };
    }
}
