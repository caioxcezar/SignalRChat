using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Models;
using SignalRChat.Models.DTO;
using SignalRChat.Repositories;

namespace SignalRChat.Controllers;
[Authorize]
[Route("api/{controller}")]
public class ChatController : Controller
{
    private readonly ChatRepository _chatRepository;

    public ChatController(ChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }
    [HttpGet]
    [Route("all")]
    public IEnumerable<ChatUserDTO> GetAll()
    {
        var user = User.Identity!.Name!;
        return _chatRepository.GetAvailable(user).Select(ChatUserDTO.Build);
    }
}