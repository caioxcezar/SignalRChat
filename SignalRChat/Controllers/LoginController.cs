using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
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
    public object Authenticate([FromBody] LoginDTO login)
    {
        try
        {
            if (login.Login == null || login.Password == null) return new NotFoundResult();
            var user = UserRepository.Get(login.Login, login.Password);
            var tokenService = new TokenService(user);
            var token = tokenService.GenerateToken();
            user.RefreshToken = Guid.NewGuid().ToString();
            UserRepository.Add(user);

            return new TokenDTO
            {
                ValidTo = tokenService.SecuryToken!.ValidTo,
                Role = user.Role,
                Token = token,
                RefreshToken = user.RefreshToken
            };
        }
        catch (InvalidOperationException)
        {
            return new BadRequestResult();
        }
    }

    [HttpPost]
    [Route("refresh")]
    [Authorize]
    public object Refresh([FromBody] string refresh) {
        var login = User.Identity!.Name!;
        var user = UserRepository.Get(login);
        if (user == null) return new BadRequestResult();
        if (user.RefreshToken != refresh) return new BadRequestResult();
        return Authenticate(new() { Login = user.Login, Password = user.Password });
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
    public string Authenticated() => String.Format("Authenticated - {0}", User.Identity!.Name);
}