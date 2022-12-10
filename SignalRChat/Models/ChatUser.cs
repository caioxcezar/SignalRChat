using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SignalRChat.Models;

public class ChatUser
{
    [Key]
    [Column(TypeName = "nvarchar(20)")]
    public string Login { get; set; }
    [Column(TypeName = "nvarchar(50)")]
    public string ConnectionId { get; set; }
    [Column]
    public DateTime Created { get; set; }
    [Column]
    public DateTime Updated { get; set; }
}