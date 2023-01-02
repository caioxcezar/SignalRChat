namespace SignalRChat.Models.DTO;

public class ChatUserDto
{
    public string? Name { get; set; }
    public string? ConnectionId { get; set; }

    public static ChatUserDto Build(ChatUser chat) => new() { Name = chat.Login, ConnectionId = chat.ConnectionId };
}