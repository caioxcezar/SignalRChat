using Microsoft.EntityFrameworkCore;
using SignalRChat.Models;
using SignalRChat.Services;

namespace SignalRChat.Contexts;

public class DataContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var connectionString = ConfigurationService.Instance.GetValue("ConnectionStrings:SignalChatDb");
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    }

    public DbSet<User> Users { get; set; }
    public DbSet<ChatUser> ChatUsers { get; set; }
}