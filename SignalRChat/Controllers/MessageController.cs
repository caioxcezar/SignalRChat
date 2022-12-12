using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Models;
using SignalRChat.Models.DTO;
using SignalRChat.Repositories;

namespace SignalRChat.Controllers
{
    [Authorize]
    [Route("api/{controller}")]
    public class MessageController : Controller
    {
        private readonly MessageRepository _messageRepository;

        public MessageController(MessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        [HttpGet]
        [Route("messages/{receiver}")]
        public IEnumerable<MessageDTO> getMessages(string receiver)
        {
            var user = User.Identity!.Name!;
            var list = _messageRepository.getMessages(user, receiver).Select(MessageDTO.Build);
            return list;
        }

        [HttpPost]
        [Route("received")]
        public IActionResult updateMessage([FromBody]int id)
        {
            var user = User.Identity!.Name!;
            var message = _messageRepository.getMessage(id);
            if (message != null && (message.Sender == user || message.Receiver == user))
            {
                message.IsDelivered = true;
                _messageRepository.Update(message);
                return new OkResult();
            }

            return BadRequest();
        }
    }
}
