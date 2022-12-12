namespace SignalRChat.Models.DTO
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public string Receiver { get; set; }
        public string Text { get; set; }

        internal static MessageDTO Build(Message message) => new() { Id = message.Id, Receiver = message.Receiver, Text = message.Text };
    }
}
