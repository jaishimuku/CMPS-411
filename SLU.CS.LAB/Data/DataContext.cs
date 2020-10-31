using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<Schedule> TASchedules { get; set; }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(u => u.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(u => u.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);
        }


    }
}
