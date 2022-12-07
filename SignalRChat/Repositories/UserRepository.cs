using System.Net;
using System.Security;
using SignalRChat.Models;

namespace SignalRChat.Repositories;

public class UserRepository
{
    public static User Get(string username, string password)
    {
        var users = new List<User>
        {
            new(1, new NetworkCredential("batman", "batman"), "manager"),
            new(2, new NetworkCredential("robin", "robin"), "employee")
        };
        return users.First(x => string.Equals(x.NetworkCredential.UserName, username, StringComparison.CurrentCultureIgnoreCase) && x.NetworkCredential.Password == password);
    }
}