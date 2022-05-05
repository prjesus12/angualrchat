using angualrchat.Areas.Identity.Data;
using angualrchat.Hubs;
using angualrchat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace angualrchat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SenderController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ILogger<UserController> _logger;
        private readonly IHubContext<Mensajes> _hubContext;
        public SenderController(IHubContext<Mensajes> hubContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<UserController> logger)
        {
            _hubContext = hubContext;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this._logger = logger;
        }
        [HttpPost]
        public IActionResult SendMensaje([FromBody] MensajeDb mensaje)
        {
            string msg = Newtonsoft.Json.JsonConvert.SerializeObject(mensaje);


            _hubContext.Clients.All.SendAsync("enviartodos", msg);

            return Ok(new { resp = "sended" });
        }

        
        
    }
}
