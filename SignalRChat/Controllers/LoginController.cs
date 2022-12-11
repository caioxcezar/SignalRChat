using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Models.DTO;
using SignalRChat.Repositories;
using SignalRChat.Services;

namespace SignalRChat.Controllers;
[AllowAnonymous]
[Route("api")]
public class LoginController : Controller
{
    [HttpPost]
    [Route("login")]
    public object Authenticate([FromBody]LoginDTO login)
    {
        try
        {
            if (login.Login == null || login.Password == null) return new NotFoundResult();
            var user = UserRepository.Get(login.Login, login.Password);
            var token = TokenService.GenerateToken(user);
            return new TokenDTO
            {
                Name = user.Name,
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
    [Route("login/isAvailable/{login}")]
    public bool IsAvailable(string login) => UserRepository.LoginIsAvailable(login);
    
    [HttpPost]
    [Route("login/register")]
    public void Register([FromBody]UserDTO user) => UserRepository.Add(Models.User.Build(user));

    [HttpGet]
    [Route("authenticated")]
    [Authorize]
    public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);
}