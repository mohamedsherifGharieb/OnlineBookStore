using BookStoreApi.DTOS;
using BookStoreApi.Entities;

public static class EBookExtensions
{
     public static EBookWithStoreDto ToUserBookDto(this EBook book)
    {
        return new EBookWithStoreDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Description = book.Description,
            Price = book.Price,
            ImageUrl = book.ImageUrl,
            StoreName = book.Store.Name 
        };
    }

    public static EBookWithStoreDto ToBookStoreOwnerDto(this EBook book)
    {
        return new EBookWithStoreDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            ISBN = book.ISBN,
            Description = book.Description,
            Price = book.Price,
            StockQuantity = book.StockQuantity,
            ImageUrl = book.ImageUrl,
            StoreId = book.StoreId,
            StoreName = book.Store.Name 
        };
    }
}
