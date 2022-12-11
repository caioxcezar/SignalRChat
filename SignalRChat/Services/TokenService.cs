using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SignalRChat.Models;

namespace SignalRChat.Services;

public class TokenService
{
    private User User { get; set; }
    public SecurityToken? SecuryToken { get; private set; }
    public TokenService(User user)
    {
        User = user;
    }
    public string GenerateToken()
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(ConfigurationService.Instance.GetValue("Secret"));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.GivenName, User.Name),
                new Claim(ClaimTypes.Name, User.Login),
                new Claim(ClaimTypes.Role, User.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        SecuryToken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(SecuryToken);
    }
}