namespace SignalRChat.Models.DTO;

public class TokenDTO
{
    public DateTime? ValidTo { get; set; }
    public string? Role { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
}