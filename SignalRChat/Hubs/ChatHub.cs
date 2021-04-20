using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        /// <summary>
        /// This function is used to Send a message to all currently connected clients.
        /// </summary>
        /// <param name="name">Client nickname</param>
        /// <param name="message">Client message</param>
        public void SendToAll(string name, string message)
        {
            Clients.All.SendAsync("sendToAll", name, message);
        }
    }
}
