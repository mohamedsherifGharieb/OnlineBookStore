using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    public class StoreController(AppDbContext _context) : BaseApiController
    {
        // =====================================
        // GET: api/store
        // Get all stores (public browsing)
        // =====================================
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<StoreDto>>> GetAllStores()
        {
            var stores = await _context.Stores
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();

            return Ok(stores.Select(s => new StoreDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                CreatedAt = s.CreatedAt
            }).ToList());
        }

        // =====================================
        // GET: api/store/{id}
        // Get specific store details (public)
        // =====================================
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDetailDto>> GetStoreById(string id)
        {
            if (!Guid.TryParse(id, out _))
                return BadRequest("Invalid store ID format");

            var store = await _context.Stores
                .Include(s => s.Books)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (store == null)
                return NotFound("Store not found");

            return Ok(new StoreDetailDto
            {
                Id = store.Id,
                Name = store.Name,
                Description = store.Description,
                CreatedAt = store.CreatedAt,
                TotalBooks = store.Books.Count,
                Books = store.Books.Select(b => new EBookDto
                {
                    Id = b.Id,
                    Title = b.Title,
                    Author = b.Author,
                    ISBN = b.ISBN,
                    Description = b.Description,
                    Price = b.Price,
                    StockQuantity = b.StockQuantity,
                    ImageUrl = b.ImageUrl
                }).ToList()
            });
        }

        // =====================================
        // GET: api/store/{id}/books
        // Get all books in a specific store
        // =====================================
        [HttpGet("{id}/books")]
        public async Task<ActionResult<IReadOnlyList<EBookDto>>> GetStoreBooks(string id)
        {
            if (!Guid.TryParse(id, out _))
                return BadRequest("Invalid store ID format");

            var storeExists = await _context.Stores.AnyAsync(s => s.Id == id);
            
            if (!storeExists)
                return NotFound("Store not found");

            var books = await _context.Books
                .Where(b => b.StoreId == id)
                .ToListAsync();

            return Ok(books.Select(b => new EBookDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                ISBN = b.ISBN,
                Description = b.Description,
                Price = b.Price,
                StockQuantity = b.StockQuantity,
                ImageUrl = b.ImageUrl
            }).ToList());
        }

        // =====================================
        // GET: api/store/search?name=xyz
        // Search stores by name
        // =====================================
        [HttpGet("search")]
        public async Task<ActionResult<IReadOnlyList<StoreDto>>> SearchStores([FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Search term cannot be empty");

            var stores = await _context.Stores
                .Where(s => s.Name.ToLower().Contains(name.ToLower()))
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();

            return Ok(stores.Select(s => new StoreDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                CreatedAt = s.CreatedAt
            }).ToList());
        }
    }
}