using System.Net;
using System.Security;

namespace SignalRChat.Models;

public class User
{
    public User(int id, NetworkCredential networkCredential, string role)
    {
        Id = id;
        NetworkCredential = networkCredential;
        Role = role;
    }

    public int Id { get; set; }
    public NetworkCredential NetworkCredential { get; set; }
    public string Role { get; set; }
}