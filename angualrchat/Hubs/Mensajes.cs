using Microsoft.AspNetCore.SignalR;

namespace angualrchat.Hubs
{
    public class Mensajes : Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public Task NotificaTodos(string mensaje)
        {
            return Clients.All.SendAsync("prepararventa", mensaje);
        }
    }
}
