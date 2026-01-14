using System;
using System.ComponentModel.DataAnnotations;
using BookStoreApi.Entities;

namespace BookStoreApi.DTOS;

public class RegisterDto
{
    [Required]
    public string DisplayName { get; set; }= "";

    [Required]
    public string Email { get; set; } = "";

    [Required]
    [MinLength(4)]
    public string Password { get; set; } = "";
    
    [Required]
    public UserRole Role { get; set;}
}
