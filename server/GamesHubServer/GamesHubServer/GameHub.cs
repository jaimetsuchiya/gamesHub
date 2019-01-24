using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace GamesHubServer
{
    public class GameHub : Hub
    {
        //public void SendMessage(string name, string message)
        //{
        //    Clients.All.SendAsync("ReceiveMessage", name, message);
        //}

        private static Dictionary<string, int> DicPosicaoJogadores;

        public void Jogar(string playerName, int posX, int posY)
        {
            Clients.All.SendAsync("ReceberJogada", playerName, posX, posY);
        }

        public void NovaPartida(string playerName)
        {
            Clients.All.SendAsync("NotificarNovaPartida", playerName);
        }

        public void NovaPartidaZerar(string playerName)
        {
            Clients.All.SendAsync("NotificarNovaPartidaZerar", playerName);
        }

        //public void VerificaPosicaoJogador(string playerName)
        //{
        //    if (DicPosicaoJogadores == null)
        //        DicPosicaoJogadores = new Dictionary<string, int>();

        //    if (DicPosicaoJogadores.Count <= 0)
        //    {
        //        DicPosicaoJogadores.Add(playerName, 1);
        //    }
        //    else
        //    {
        //        DicPosicaoJogadores.Add(playerName, 2);
        //    }

        //    int posicaoJogador = DicPosicaoJogadores[playerName];

        //    Clients.All.SendAsync("NotificarPosicaoJogador", playerName, posicaoJogador);
        //}


    }
}