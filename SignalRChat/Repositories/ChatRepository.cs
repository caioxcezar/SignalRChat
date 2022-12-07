using SignalRChat.Models;

namespace SignalRChat.Repositories;

public class ChatRepository
{
    private static readonly List<ChatUser> Users = new();
    public List<ChatUser> GetAvailable(string username) => Users.FindAll(chat => chat.Name != username);
    public ChatUser? Get(string username) => Users.Find(chat => chat.Name == username);
    public void Add(ChatUser chatUser)
    {
        var old = Users.Find(chat => chat.Name == chatUser.Name);
        if (old != null) old.ConnectionId = chatUser.ConnectionId;
        else Users.Add(chatUser);
    }
}