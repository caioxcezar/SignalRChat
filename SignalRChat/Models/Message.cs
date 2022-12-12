using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SignalRChat.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Sender { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Receiver { get; set; }
        [Column(TypeName = "nvarchar(516)")]
        public string Text { get; set; }
        [Column]
        public DateTime Created { get; set; }
        [Column]
        public DateTime Updated { get; set; }
        [Column]
        public bool IsDeleted { get; set; }
        [Column]
        public bool IsDelivered { get; set; }
    }
}
