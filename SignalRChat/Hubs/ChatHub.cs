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
        var user = Context.User!.Identity!.Name!;
        _chatRepository.Add(new() { Name = user, ConnectionId = Context.ConnectionId });
        return base.OnConnectedAsync();
    }

    public async Task SendMessage(string sendTo, string message)
    {
        var chat = _chatRepository.Get(sendTo);
        if (chat == null) throw new NotImplementedException("TODO Salvar mensagem para ser exibida depois");
        await Clients.Client(chat.ConnectionId!).SendAsync("ReceiveMessage", Context.User!.Identity!.Name!, message);
    }
}