using System;
using BookStoreApi.Data;
using BookStoreApi.DTOS;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers;

public class EBookController(AppDbContext _context) : BaseApiController
{
    // 1️⃣ GET: api/ebook
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<EBookWithStoreDto>>> GetBooks()
    {
        var books = await _context.Books
            .Include(b => b.Store)
            .AsNoTracking()
            .ToListAsync();

        return Ok(books.Select(b => new EBookWithStoreDto
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author,
            ISBN = b.ISBN,
            Description = b.Description,
            Price = b.Price,
            StockQuantity = b.StockQuantity,
            ImageUrl = b.ImageUrl,
            StoreId = b.StoreId,
            StoreName = b.Store.Name
        }).ToList());
    }

    // 2️⃣ GET: api/ebook/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<EBookWithStoreDto>> GetBookById(string id)
    {
        var book = await _context.Books
            .Include(b => b.Store)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
            return NotFound();

        return Ok(new EBookWithStoreDto
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
        });
    }

    // 3️⃣ GET: api/ebook/isbn/{isbn}
    [HttpGet("isbn/{isbn}")]
    public async Task<ActionResult<EBookWithStoreDto>> GetBookByISBN(string isbn)
    {
        var book = await _context.Books
            .Include(b => b.Store)
            .FirstOrDefaultAsync(b => b.ISBN == isbn);

        if (book == null)
            return NotFound();

        return Ok(new EBookWithStoreDto
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
        });
    }

    // 4️⃣ GET: api/ebook/author/{author}
    [HttpGet("author/{author}")]
    public async Task<ActionResult<IReadOnlyList<EBookWithStoreDto>>> GetBooksByAuthor(string author)
    {
        var books = await _context.Books
            .Include(b => b.Store)
            .Where(b => b.Author != null && b.Author.ToLower().Contains(author.ToLower()))
            .ToListAsync();

        return Ok(books.Select(b => new EBookWithStoreDto
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author,
            ISBN = b.ISBN,
            Description = b.Description,
            Price = b.Price,
            StockQuantity = b.StockQuantity,
            ImageUrl = b.ImageUrl,
            StoreId = b.StoreId,
            StoreName = b.Store.Name
        }).ToList());
    }

    // 5️⃣ GET: api/ebook/search?title=abc
    [HttpGet("search")]
    public async Task<ActionResult<IReadOnlyList<EBookWithStoreDto>>> SearchBooks([FromQuery] string title)
    {
        var books = await _context.Books
            .Include(b => b.Store)
            .Where(b => b.Title != null && b.Title.ToLower().Contains(title.ToLower()))
            .ToListAsync();

        return Ok(books.Select(b => new EBookWithStoreDto
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author,
            ISBN = b.ISBN,
            Description = b.Description,
            Price = b.Price,
            StockQuantity = b.StockQuantity,
            ImageUrl = b.ImageUrl,
            StoreId = b.StoreId,
            StoreName = b.Store.Name
        }).ToList());
    }

    // 6️⃣ GET: api/ebook/user/{storeId}
    [HttpGet("user/{storeId}")]
    public async Task<ActionResult<IReadOnlyList<EBookWithStoreDto>>> GetUserOwnedBooks(string storeId)
    {
        if (!Guid.TryParse(storeId, out _))
            return BadRequest("Invalid store ID format");
            
        var books = await _context.Books
            .Include(b => b.Store)
            .Where(b => b.StoreId == storeId)
            .ToListAsync();

        return Ok(books.Select(b => new EBookWithStoreDto
        {
            Id = b.Id,
            Title = b.Title,
            Author = b.Author,
            ISBN = b.ISBN,
            Description = b.Description,
            Price = b.Price,
            StockQuantity = b.StockQuantity,
            ImageUrl = b.ImageUrl,
            StoreId = b.StoreId,
            StoreName = b.Store.Name
        }).ToList());
    }

    // 7️⃣ POST: api/ebook
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<EBookDto>> AddBook(CreateEBookDto dto)
    {
        // Validate store exists
        var store = await _context.Stores.FindAsync(dto.StoreId);
        if (store == null)
            return NotFound("Store not found");

        var newBook = new EBook
        {
            Id = Guid.NewGuid().ToString(),
            Title = dto.Title,
            ISBN = dto.ISBN,
            Author = dto.Author,
            Description = dto.Description,
            Price = dto.Price,
            StockQuantity = dto.StockQuantity,
            StoreId = dto.StoreId,
            ImageUrl = dto.ImageUrl
        };

        _context.Books.Add(newBook);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, new EBookWithStoreDto
        {
            Id = newBook.Id,
            Title = newBook.Title,
            Author = newBook.Author,
            ISBN = newBook.ISBN,
            Description = newBook.Description,
            Price = newBook.Price,
            StockQuantity = newBook.StockQuantity,
            ImageUrl = newBook.ImageUrl,
            StoreId = newBook.StoreId,
            StoreName = store.Name
        });
    }

    // 8️⃣ DELETE: api/ebook/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteBook(string id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
            return NotFound();

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}