using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Models.DTO;
using SignalRChat.Repositories;

namespace SignalRChat.Controllers;
[Authorize]
public class ChatController : Controller
{
    private readonly ChatRepository _chatRepository;

    public ChatController(ChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }

    public IEnumerable<ChatUserDTO> GetAll()
    {
        var user = User.Identity!.Name!;
        return _chatRepository.GetAvailable(user).Select(ChatUserDTO.Build);
    }
}