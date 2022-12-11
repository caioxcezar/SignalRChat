using SignalRChat.Contexts;
using SignalRChat.Models;

namespace SignalRChat.Repositories;

public static class UserRepository
{
    public static User Get(string login, string password)
    {
        using var dbContext = new DataContext();
        return dbContext.Users.First(user => user.Login == login && user.Password == password);
    }

    public static User Get(string login)
    {
        using var dbContext = new DataContext();
        return dbContext.Users.First(user => user.Login == login);
    }

    public static bool LoginIsAvailable(string login)
    {
        using var dbContext = new DataContext();
        var old = dbContext.Users.FirstOrDefault(u => u.Login == login);
        return old == null;
    }

    public static void Add(User user)
    {
        using var dbContext = new DataContext();
        var old = dbContext.Users.FirstOrDefault(u => u.Login == user.Login);
        if (old != null)
        {
            old = user;
            old.Updated = DateTime.Now;
        }
        else
        {
            user.Created = DateTime.Now;
            dbContext.Users.Add(user);
        }
        dbContext.SaveChanges();
    }
}