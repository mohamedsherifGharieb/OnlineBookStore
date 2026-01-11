using BookStoreApi.Data;
using BookStoreApi.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApi.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetUsers()
        {
            return await _context.Users.AsNoTracking().ToListAsync();
        }

        // GET: api/users/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<AppUser>> CreateUser(AppUser newUser)
        {
            _context.Users.Add(newUser);
            
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/users/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, AppUser updatedUser)
        {
            if (id != updatedUser.Id)
                return BadRequest("ID mismatch");

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            // SAFE updates only
            user.DisplayName = updatedUser.DisplayName;
            user.Email = updatedUser.Email;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
