using Microsoft.EntityFrameworkCore;
using SignalRChat.Contexts;
using SignalRChat.Models;

namespace SignalRChat.Repositories;

public class ChatRepository
{
    public IEnumerable<ChatUser> GetAvailable(string login) {
        using var dbContext = new DataContext();
        return dbContext.ChatUsers.Where(chat => chat.Login != login).ToList();
    }
    public ChatUser? Get(string login) {
        using var dbContext = new DataContext();
        return dbContext.ChatUsers.FirstOrDefault(chat => chat.Login == login);
    }
    public void Add(ChatUser chatUser)
    {
        using var dbContext = new DataContext();
        var old = dbContext.ChatUsers.FirstOrDefault(chat => chat.Login == chatUser.Login);
        if (old != null)
        {
            old.ConnectionId = chatUser.ConnectionId;
            old.Updated = DateTime.Now;
        }
        else
        {
            chatUser.Created = DateTime.Now;
            dbContext.ChatUsers.Add(chatUser);
        }
        dbContext.SaveChanges();
    }

    internal void Remove(string login)
    {

        using var dbContext = new DataContext();
        var rm = dbContext.ChatUsers.First(chat => chat.Login == login);
        if(rm != null)
        {
            dbContext.ChatUsers.Remove(rm);
            dbContext.SaveChanges();
        }
    }
}