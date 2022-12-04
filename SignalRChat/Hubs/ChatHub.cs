using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs;

public class ChatHub : Hub
{
    private async Task SendMessage(string user, string message) =>
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    public async Task SendMessage(string connectionId, string user, string message) =>
        await Clients.Client(connectionId).SendAsync("ReceiveMessage", user, message);
}