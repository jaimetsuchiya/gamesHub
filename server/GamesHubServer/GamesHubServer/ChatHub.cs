using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GamesHubServer
{
    internal class ChatHub : Hub
    {
        private readonly ICustomUserIdProvider userProvider;
        private readonly IGroupIdProvider groupProvider;

        public ChatHub(ICustomUserIdProvider userProvider, IGroupIdProvider groupProvider) {
            this.userProvider = userProvider;
            this.groupProvider = groupProvider;
        }

        public Task SendMessageToGroup(string groupName, string message)
        {
            var userName = userProvider.GetUserId(Context.ConnectionId);
            return Clients.Group(groupName).SendAsync("Send", $"{userName}: {message}");
        }

        public async Task AddToGroup(string groupName, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            userProvider.AddUser(Context.ConnectionId, userName);
            groupProvider.AddConnectionToGroup(groupName, Context.ConnectionId);

            await Clients.Group(groupName).SendAsync("Send", $"{userName} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var userName = userProvider.GetUserId(Context.ConnectionId);

            userProvider.RemoveUser(Context.ConnectionId);
            groupProvider.RemoveConnectionFromGroup(groupName, Context.ConnectionId);

            await Clients.Group(groupName).SendAsync("Send", $"{userName} has left the group {groupName}.");
        }
    }
}