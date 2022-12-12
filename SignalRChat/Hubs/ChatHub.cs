using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Models;
using SignalRChat.Repositories;

namespace SignalRChat.Hubs;
[Authorize]
public class ChatHub : Hub
{
    private readonly ChatRepository _chatRepository;
    private readonly MessageRepository _messageRepository;

    public ChatHub(ChatRepository chatRepository, MessageRepository messageRepository)
    {
        _chatRepository = chatRepository;
        _messageRepository = messageRepository;
    }

    public override Task OnConnectedAsync()
    {
        var login = Context.User!.Identity!.Name!;
        _chatRepository.Add(new() { Login = login, ConnectionId = Context.ConnectionId });
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var login = Context.User!.Identity!.Name!;
        _chatRepository.Remove(login);
        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(string sendTo, string text)
    {
        var id = _messageRepository.Add(new()
        {
            Text = text,
            Created = DateTime.Now,
            IsDeleted = false,
            Receiver = sendTo,
            Sender = Context.User!.Identity!.Name!
        });
        var chat = _chatRepository.Get(sendTo);
        if (chat != null)
        {
            var user = ((ClaimsIdentity)Context.User!.Identity!).FindFirst(ClaimTypes.GivenName)!.Value;
            await Clients.Client(chat.ConnectionId).SendAsync("ReceiveMessage", user, text, id);
        }
    }
}