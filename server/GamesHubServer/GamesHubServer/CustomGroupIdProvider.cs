using System.Collections.Generic;

namespace GamesHubServer
{
    internal interface IGroupIdProvider
    {
        void AddGroup(string groupName, string connectionId);
        void AddConnectionToGroup(string groupName, string connectionId);

        void RemoveGroup(string groupName);
        void RemoveConnectionFromGroup(string groupName, string connectionId);

        List<string> GetConnectionsFromGroup(string groupName);
    }

    internal class CustomGroupIdProvider: IGroupIdProvider
    {
        private Dictionary<string, List<string>> _groups = new Dictionary<string, List<string>>();

        public void AddGroup(string groupName, string connectionId)
        {
            if (_groups[groupName] == null)
                _groups.Add(groupName, new List<string>() { connectionId });
        }

        public void AddConnectionToGroup(string groupName, string connectionId)
        {
            if (_groups[groupName] == null)
                AddGroup(groupName, connectionId);
            else
                _groups[groupName].Add(connectionId);
        }

        public List<string> GetConnectionsFromGroup(string groupName)
        {
            return _groups[groupName];
        }

        public void RemoveConnectionFromGroup(string groupName, string connectionId)
        {
            if (_groups[groupName] != null) {
                _groups[groupName].Remove(connectionId);
            }
        }

        public void RemoveGroup(string groupName)
        {
            if (_groups[groupName] != null)
            {
                _groups.Remove(groupName);
            }
        }
    }
}