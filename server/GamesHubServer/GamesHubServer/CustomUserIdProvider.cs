using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace GamesHubServer
{
    public interface ICustomUserIdProvider
    {
        void AddUser(string connectionId, string userName);
        string GetUserId(string connectionId);
        void RemoveUser(string connectionId);
    }

    internal class CustomUserIdProvider : ICustomUserIdProvider
    {
        private Dictionary<string, string> _users = new Dictionary<string, string>();

        public void AddUser(string connectionId, string userName)
        {
            if (_users[connectionId] == null)
                _users.Add(connectionId, userName);
        }

        public string GetUserId(string connectionId)
        {
            if (_users[connectionId] == null)
                return _users[connectionId];
            else
                return connectionId;
        }

        public void RemoveUser(string connectionId) {

            if (_users[connectionId] != null)
                _users.Remove(connectionId);

        }
    }
}