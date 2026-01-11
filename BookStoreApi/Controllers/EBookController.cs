using System;
using BookStoreApi.Data;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers;


public class EBookController(AppDbContext _context) : BaseApiController
{
   

    // 1️⃣ GET: api/ebooks
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<EBook>>> GetBooks()
    {
        return await _context.Books.AsNoTracking().ToListAsync();
    }

    // 2️⃣ GET: api/ebooks/{id} or /api/ebooks/isbn/{isbn}
    [HttpGet("{id}")]
    public async Task<ActionResult<EBook>> GetBookById(string id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        return Ok(book);
    }

    [HttpGet("isbn/{isbn}")]
    public async Task<ActionResult<EBook>> GetBookByISBN(string isbn)
    {
        var book = await _context.Books
            .FirstOrDefaultAsync(b => b.ISBN == isbn);

        if (book == null)
            return NotFound();

        return Ok(book);
    }

    // 3️⃣ GET: api/ebooks/author/{author}
    [HttpGet("author/{author}")]
    public async Task<ActionResult<IReadOnlyList<EBook>>> GetBooksByAuthor(string author)
    {
        var books = await _context.Books
            .Where(b => b.Author != null && b.Author.ToLower().Contains(author.ToLower()))
            .ToListAsync();

        return Ok(books);
    }

    // 4️⃣ GET: api/ebooks/search?title=abc
    [HttpGet("search")]
    public async Task<ActionResult<IReadOnlyList<EBook>>> SearchBooks([FromQuery] string title)
    {
        var books = await _context.Books
            .Where(b => b.Title != null && b.Title.ToLower().Contains(title.ToLower()))
            .ToListAsync();

        return Ok(books);
    }

    // 5️⃣ GET: api/ebooks/user/{storeId} => books owned by a store/user
    [HttpGet("user/{storeId}")]
    public async Task<ActionResult<IReadOnlyList<EBook>>> GetUserOwnedBooks(Guid storeId)
    {
        var books = await _context.Books
            .Where(b => b.StoreId.Equals(storeId))
            .ToListAsync();

        return Ok(books);
    }

    // Optional: owner can add a book to his store
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<EBook>> Addbook(EBook newBook)
    {
        _context.Books.Add(newBook);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [HttpDelete("{id}")]
public async Task<IActionResult> DeleteBook(string id)
{
    Console.WriteLine("DELETE HIT with ID: " + id);

    var book = await _context.Books.FindAsync(id);

    if (book == null)
    {
        Console.WriteLine("BOOK NOT FOUND");
        return NotFound();
    }

    Console.WriteLine("BOOK FOUND, DELETING");

    _context.Books.Remove(book);
    await _context.SaveChangesAsync();

    Console.WriteLine("DELETE SAVED");

    return NoContent();
}

}
