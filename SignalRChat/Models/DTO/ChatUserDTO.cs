namespace SignalRChat.Models.DTO;

public class ChatUserDTO
{
    public string? Name { get; set; }
    public string? ConnectionId { get; set; }

    public static ChatUserDTO Build(ChatUser chat) => new() { Name = chat.Login, ConnectionId = chat.ConnectionId };
}