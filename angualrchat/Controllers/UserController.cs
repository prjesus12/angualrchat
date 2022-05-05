using angualrchat.Areas.Identity.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace angualrchat.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ILogger<UserController> _logger;
        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger) {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this._logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] ApplicationUser model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.UserName, Email = model.Email, Password = model.PasswordHash };
                var findUser = await userManager.FindByNameAsync(model.UserName);
                if (findUser == null)
                {
                    var result = await userManager.CreateAsync(user);

                    if (result.Succeeded)
                    {
                        return Ok(new Response { Status = "Success", Message = "User created" });
                    }
                    else
                    {
                        var error = result.Errors.FirstOrDefault();
                        return Ok(new Response { Status = "Failed", Message = error.Description });
                    }
                }
                else
                {
                    return Ok(new Response { Status = "Failed", Message = "Usuario existente" });
                }
                
            }
            return Ok(new Response { Status = "Failed", Message = "Modelo incorrecto" });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] ApplicationUser user)
        {
            if (ModelState.IsValid)
            {
                var result = await userManager.FindByEmailAsync(user.Email);
                //var result = await signInManager.PasswordSignInAsync(user.UserName, user.PasswordHash, isPersistent : false, lockoutOnFailure: false);
                if (result != null)
                {
                    var password = result.Password;
                    if(user.PasswordHash == password)
                    {
                        _logger.LogInformation("User logged in.");
                        var toSend = new ApplicationUser { UserName = result.UserName, Email = user.Email, Password = user.PasswordHash, Id = result.Id };
                        var serialized = Newtonsoft.Json.JsonConvert.SerializeObject(toSend);

                        return Ok(new Response { Status = "Success", Message = serialized });
                    }
                    else
                    {
                        return Ok(new Response { Status = "Failed", Message = "Wrong Password" });
                    }
                    
                }

                return Ok(new Response { Status = "Failed", Message = "Invalid login attempt." });
            }
            return Ok(new Response { Status = "Failed", Message = "Invalid login attempt." });
        }
    }
}
