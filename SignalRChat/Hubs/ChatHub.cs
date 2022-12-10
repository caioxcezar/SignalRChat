using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Repositories;

namespace SignalRChat.Hubs;
[Authorize]
public class ChatHub : Hub
{
    private readonly ChatRepository _chatRepository;

    public ChatHub(ChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }

    public override Task OnConnectedAsync()
    {
        var login = Context.User!.Identity!.Name!;
        _chatRepository.Add(new() { Login = login, ConnectionId = Context.ConnectionId });
        return base.OnConnectedAsync();
    }

    public async Task SendMessage(string sendTo, string message)
    {
        var chat = _chatRepository.Get(sendTo);
        if (chat == null) throw new NotImplementedException("TODO Salvar mensagem para ser exibida depois");
        var user = ((ClaimsIdentity)Context.User!.Identity!).FindFirst(ClaimTypes.GivenName)!.Value;
        await Clients.Client(chat.ConnectionId).SendAsync("ReceiveMessage", user, message);
    }
}