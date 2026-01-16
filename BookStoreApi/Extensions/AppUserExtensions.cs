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
  public static BuyerProfileDto ToBuyerProfileDto(this AppUser user, BuyerProfile profile)
    {
        return new BuyerProfileDto
        {
            Id = profile.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            ShippingAddress = profile.ShippingAddress,
            PhoneNumber = profile.PhoneNumber
        };
    }
    public static StoreOwnerProfileDto ToStoreOwnerProfileDto(this AppUser user, StoreOwnerProfile profile)
    {
        return new StoreOwnerProfileDto
        {
            Id = profile.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            BusinessName = profile.BusinessName,
            TaxId = profile.TaxId,
            StoreId = profile.OwnedStore?.Id,
            StoreName = profile.OwnedStore?.Name
        };
    }
}
