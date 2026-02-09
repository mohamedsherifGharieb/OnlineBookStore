using System;

namespace BookStoreApi.Error;

public class ApiErrorException(int statusCode , string Message , string? details )
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = Message;
    public string? Details { get; set; } = details;     

}
