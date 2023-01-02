using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SignalRChat.Models.DTO;

namespace SignalRChat.Models;

public class User
{
    [Key]
    [Column(TypeName = "nvarchar(20)")]
    public string Login { get; set; } = "";

    [Column(TypeName = "nvarchar(250)")] public string Name { get; set; } = "";
    [Column(TypeName = "nvarchar(50)")] public string Password { get; set; } = "";
    [Column(TypeName = "varchar(100)")] public string Role { get; set; } = "";
    [Column(TypeName = "varchar(50)")] public string RefreshToken { get; set; } = "";
    [Column] public DateTime Created { get; set; }
    [Column] public DateTime Updated { get; set; }

    public static User Build(UserDTO user) => new()
    {
        Login = user.Login,
        Name = user.Name,
        Password = user.Password,
        Role = user.Role
    };
}