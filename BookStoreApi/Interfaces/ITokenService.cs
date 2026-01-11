using System;
using BookStoreApi.Entities;

namespace BookStoreApi.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);

}
