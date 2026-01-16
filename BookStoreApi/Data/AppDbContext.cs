using Microsoft.EntityFrameworkCore;
using BookStoreApi.Entities;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BookStoreApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ============================
        // DbSets
        // ============================
        public DbSet<AppUser> Users => Set<AppUser>();
        public DbSet<BuyerProfile> BuyerProfiles => Set<BuyerProfile>();
        public DbSet<StoreOwnerProfile> StoreOwnerProfiles => Set<StoreOwnerProfile>();
        public DbSet<Store> Stores => Set<Store>();
        public DbSet<EBook> Books => Set<EBook>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();

        // ============================
        // Model Configuration
        // ============================
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ----------------------------
            // AppUser
            // ----------------------------
            modelBuilder.Entity<AppUser>(entity =>
            {
                entity.HasKey(u => u.Id);

                entity.Property(u => u.Id)
                      .ValueGeneratedNever(); // IMPORTANT (shared PK)

                entity.Property(u => u.Email)
                      .IsRequired()
                      .HasMaxLength(256);

                entity.HasIndex(u => u.Email)
                      .IsUnique();

                entity.Property(u => u.PasswordHash).IsRequired();
                entity.Property(u => u.PasswordSalt).IsRequired();

                entity.Property(u => u.Role)
                      .IsRequired()
                      .HasConversion<int>();
            });

            // ----------------------------
            // BuyerProfile (Shared PK)
            // ----------------------------
            modelBuilder.Entity<BuyerProfile>(entity =>
            {
                entity.HasKey(b => b.Id);

                entity.Property(b => b.Id)
                      .ValueGeneratedNever();

                entity.HasOne(b => b.User)
                      .WithOne(u => u.BuyerProfile)
                      .HasForeignKey<BuyerProfile>(b => b.Id)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ----------------------------
            // StoreOwnerProfile (Shared PK)
            // ----------------------------
            modelBuilder.Entity<StoreOwnerProfile>(entity =>
            {
                entity.HasKey(s => s.Id);

                entity.Property(s => s.Id)
                      .ValueGeneratedNever();

                entity.HasOne(s => s.User)
                      .WithOne(u => u.StoreOwnerProfile)
                      .HasForeignKey<StoreOwnerProfile>(s => s.Id)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // ----------------------------
            // Store
            // ----------------------------
            modelBuilder.Entity<Store>(entity =>
            {
                entity.HasKey(s => s.Id);

                entity.Property(s => s.Name)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.HasOne(s => s.Owner)
                      .WithOne(o => o.OwnedStore)
                      .HasForeignKey<Store>(s => s.StoreOwnerProfileId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(s => s.StoreOwnerProfileId)
                      .IsUnique();
            });

            // ----------------------------
            // EBook
            // ----------------------------
            modelBuilder.Entity<EBook>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Title)
                      .IsRequired()
                      .HasMaxLength(500);

                entity.Property(e => e.Author)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(e => e.Price)
                      .HasColumnType("decimal(18,2)");

                entity.Property(e => e.ISBN)
                      .HasMaxLength(13);

                entity.HasOne(e => e.Store)
                      .WithMany(s => s.Books)
                      .HasForeignKey(e => e.StoreId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => new { e.StoreId, e.ISBN }).IsUnique();
            });

            // ----------------------------
            // Order
            // ----------------------------
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.Id);

                entity.Property(o => o.TotalAmount)
                      .HasColumnType("decimal(18,2)");

                entity.Property(o => o.Status)
                      .HasConversion<int>();

                entity.HasOne(o => o.Buyer)
                      .WithMany(b => b.Orders)
                      .HasForeignKey(o => o.BuyerProfileId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(o => o.Store)
                      .WithMany(s => s.Orders)
                      .HasForeignKey(o => o.StoreId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(o => o.BuyerProfileId);
                entity.HasIndex(o => o.StoreId);
                entity.HasIndex(o => o.OrderDate);
            });

            // ----------------------------
            // OrderItem
            // ----------------------------
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(oi => oi.Id);

                entity.Property(oi => oi.UnitPrice)
                      .HasColumnType("decimal(18,2)");

                entity.Property(oi => oi.Subtotal)
                      .HasColumnType("decimal(18,2)");

                entity.HasOne(oi => oi.Order)
                      .WithMany(o => o.OrderItems)
                      .HasForeignKey(oi => oi.OrderId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(oi => oi.EBook)
                      .WithMany(e => e.OrderItems)
                      .HasForeignKey(oi => oi.EBookId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }

        // ============================
        // ID Generation (AppUser ONLY)
        // ============================
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<AppUser>())
            {
                if (entry.State == EntityState.Added &&
                    string.IsNullOrWhiteSpace(entry.Entity.Id))
                {
                    entry.Entity.Id = Guid.NewGuid().ToString();
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
