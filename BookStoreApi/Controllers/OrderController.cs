using System.Security.Claims;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    [Authorize]
    public class OrderController(AppDbContext _context) : BaseApiController
    {

        // =====================================
        // POST: api/order
        // Create new order (Buyer only)
        // =====================================
        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token");

            // Verify user is a buyer
            var buyerProfile = await _context.BuyerProfiles
                .FirstOrDefaultAsync(b => b.Id == userId);

            if (buyerProfile == null)
                return BadRequest("Only buyers can create orders");

            // Validate store exists
            var store = await _context.Stores.FindAsync(dto.StoreId);
            if (store == null)
                return NotFound("Store not found");

            // Create order
            var order = new Order
            {
                Id = Guid.NewGuid().ToString(),
                BuyerProfileId = userId,
                StoreId = dto.StoreId,
                ShippingAddress = dto.ShippingAddress ?? buyerProfile.ShippingAddress,
                Status = OrderStatus.Pending,
                OrderDate = DateTime.UtcNow
            };

            decimal totalAmount = 0;

            // Create order items
            foreach (var item in dto.Items)
            {
                var ebook = await _context.Books.FindAsync(item.EBookId);
                
                if (ebook == null)
                    return NotFound($"EBook with ID {item.EBookId} not found");

                if (ebook.StoreId != dto.StoreId)
                    return BadRequest($"EBook {item.EBookId} does not belong to store {dto.StoreId}");

                if (ebook.StockQuantity < item.Quantity)
                    return BadRequest($"Insufficient stock for {ebook.Title}. Available: {ebook.StockQuantity}");

                var orderItem = new OrderItem
                {
                    Id = Guid.NewGuid().ToString(),
                    OrderId = order.Id,
                    EBookId = item.EBookId,
                    Quantity = item.Quantity,
                    UnitPrice = ebook.Price,
                    Subtotal = ebook.Price * item.Quantity
                };

                totalAmount += orderItem.Subtotal;
                
                // Reduce stock
                ebook.StockQuantity -= item.Quantity;

                order.OrderItems.Add(orderItem);
            }

            order.TotalAmount = totalAmount;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, new OrderDto
            {
                Id = order.Id,
                StoreName = store.Name,
                TotalAmount = order.TotalAmount,
                Status = order.Status.ToString(),
                OrderDate = order.OrderDate,
                ShippingAddress = order.ShippingAddress,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    EBookId = oi.EBookId,
                    EBookTitle = _context.Books.Find(oi.EBookId)?.Title ?? "",
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    Subtotal = oi.Subtotal
                }).ToList()
            });
        }

        // =====================================
        // GET: api/order/{id}
        // Get specific order details
        // =====================================
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var order = await _context.Orders
                .Include(o => o.Store)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.EBook)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("Order not found");

            // Check authorization: buyer can see their own orders, store owner can see their store's orders
            var isBuyer = order.BuyerProfileId == userId;
            var isStoreOwner = await _context.Stores
                .AnyAsync(s => s.Id == order.StoreId && s.StoreOwnerProfileId == userId);

            if (!isBuyer && !isStoreOwner)
                return Forbid();

            return Ok(new OrderDto
            {
                Id = order.Id,
                StoreName = order.Store.Name,
                TotalAmount = order.TotalAmount,
                Status = order.Status.ToString(),
                OrderDate = order.OrderDate,
                CompletedDate = order.CompletedDate,
                CancelledDate = order.CancelledDate,
                ShippingAddress = order.ShippingAddress,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    EBookId = oi.EBookId,
                    EBookTitle = oi.EBook.Title,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    Subtotal = oi.Subtotal
                }).ToList()
            });
        }

        // =====================================
        // GET: api/order/buyer
        // Get all orders for logged-in buyer
        // =====================================
        [HttpGet("buyer")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetBuyerOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var orders = await _context.Orders
                .Include(o => o.Store)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.EBook)
                .Where(o => o.BuyerProfileId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders.Select(o => new OrderDto
            {
                Id = o.Id,
                StoreName = o.Store.Name,
                TotalAmount = o.TotalAmount,
                Status = o.Status.ToString(),
                OrderDate = o.OrderDate,
                CompletedDate = o.CompletedDate,
                CancelledDate = o.CancelledDate,
                ShippingAddress = o.ShippingAddress,
                Items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    EBookId = oi.EBookId,
                    EBookTitle = oi.EBook.Title,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    Subtotal = oi.Subtotal
                }).ToList()
            }).ToList());
        }

        // =====================================
        // GET: api/order/store
        // Get all orders for logged-in store owner's store
        // =====================================
        [HttpGet("store")]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetStoreOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Get store owned by this user
            var store = await _context.Stores
                .FirstOrDefaultAsync(s => s.StoreOwnerProfileId == userId);

            if (store == null)
                return NotFound("No store found for this user");

            var orders = await _context.Orders
                .Include(o => o.Store)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.EBook)
                .Where(o => o.StoreId == store.Id)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders.Select(o => new OrderDto
            {
                Id = o.Id,
                StoreName = o.Store.Name,
                TotalAmount = o.TotalAmount,
                Status = o.Status.ToString(),
                OrderDate = o.OrderDate,
                CompletedDate = o.CompletedDate,
                CancelledDate = o.CancelledDate,
                ShippingAddress = o.ShippingAddress,
                Items = o.OrderItems.Select(oi => new OrderItemDto
                {
                    EBookId = oi.EBookId,
                    EBookTitle = oi.EBook.Title,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    Subtotal = oi.Subtotal
                }).ToList()
            }).ToList());
        }

        // =====================================
        // PUT: api/order/{id}/status
        // Update order status (Store owner can update to Processing/Shipped/Delivered, Buyer can cancel)
        // =====================================
        [HttpPut("{id}/status")]
        public async Task<ActionResult> UpdateOrderStatus(string id, UpdateOrderStatusDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.EBook)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("Order not found");

            var isBuyer = order.BuyerProfileId == userId;
            var isStoreOwner = await _context.Stores
                .AnyAsync(s => s.Id == order.StoreId && s.StoreOwnerProfileId == userId);

            if (!isBuyer && !isStoreOwner)
                return Forbid();

            // Parse status
            if (!Enum.TryParse<OrderStatus>(dto.Status, true, out var newStatus))
                return BadRequest("Invalid order status");

            // Buyer can only cancel pending orders
            if (isBuyer && newStatus != OrderStatus.Cancelled)
                return BadRequest("Buyers can only cancel orders");

            if (isBuyer && order.Status != OrderStatus.Pending)
                return BadRequest("Only pending orders can be cancelled");

            // Store owner cannot cancel, only update to Processing/Shipped/Delivered
            if (isStoreOwner && newStatus == OrderStatus.Cancelled)
                return BadRequest("Store owners cannot cancel orders");

            order.Status = newStatus;

            if (newStatus == OrderStatus.Delivered)
                order.CompletedDate = DateTime.UtcNow;

            if (newStatus == OrderStatus.Cancelled)
            {
                order.CancelledDate = DateTime.UtcNow;
                
                // Restore stock
                foreach (var item in order.OrderItems)
                {
                    item.EBook.StockQuantity += item.Quantity;
                }
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // =====================================
        // DELETE: api/order/{id}
        // Cancel order (Buyer only, Pending orders only)
        // =====================================
        [HttpDelete("{id}")]
        public async Task<ActionResult> CancelOrder(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.EBook)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("Order not found");

            if (order.BuyerProfileId != userId)
                return Forbid();

            if (order.Status != OrderStatus.Pending)
                return BadRequest("Only pending orders can be cancelled");

            order.Status = OrderStatus.Cancelled;
            order.CancelledDate = DateTime.UtcNow;

            // Restore stock
            foreach (var item in order.OrderItems)
            {
                item.EBook.StockQuantity += item.Quantity;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}