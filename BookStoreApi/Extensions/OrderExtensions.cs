using BookStoreApi.DTOS;
using BookStoreApi.Entities;

public static class OrderExtensions
{
    public static OrderDto ToOrderDto(this Order o)
    {
        return new OrderDto
        {
            Id = o.Id,
            StoreName = o.Store?.Name ?? "",
            TotalAmount = o.TotalAmount,
            Status = o.Status.ToString(),
            OrderDate = o.OrderDate,
            CompletedDate = o.CompletedDate,
            CancelledDate = o.CancelledDate,
            ShippingAddress = o.ShippingAddress,
            Items = o.OrderItems.Select(oi => new OrderItemDto
            {
                EBookId = oi.EBookId,
                EBookTitle = oi.EBook?.Title ?? "",
                Quantity = oi.Quantity,
                UnitPrice = oi.UnitPrice,
                Subtotal = oi.Subtotal
            }).ToList()
        };
    }
}
