using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Models.DTO;
using SignalRChat.Repositories;
using SignalRChat.Services;

namespace SignalRChat.Controllers;

public class LoginController : Controller
{
    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public object Authenticate([FromBody]LoginDTO login)
    {
        try
        {
            if (login.Name == null || login.Password == null) return new NotFoundResult();
            var user = UserRepository.Get(login.Name, login.Password);
            var token = TokenService.GenerateToken(user);
            return new TokenDTO
            {
                Name = user.NetworkCredential.UserName,
                Role = user.Role,
                Token = token
            };
        }
        catch (InvalidOperationException)
        {
            return new NotFoundResult();
        }
    }
    
    [HttpGet]
    [Route("authenticated")]
    [Authorize]
    public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);
}