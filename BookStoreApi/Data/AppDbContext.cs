using Microsoft.EntityFrameworkCore;
using BookStoreApi.Entities;

namespace BookStoreApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<EBook> Books { get; set; }

        
    }
}
