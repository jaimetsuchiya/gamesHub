import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { JogoDaVelhaService } from './jogodavelha.service';
import { HubConnection } from '@aspnet/signalr'; 
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-jogodavelha',
  templateUrl: './jogodavelha.component.html',
  styleUrls: ['./jogodavelha.component.css']
})

export class JogoDaVelhaComponent implements OnInit{
  
  private hubConnection : HubConnection | undefined;

  playerName = '';
  playerNameRival = '';
  message = '';
  messages : string[] = [];
  // isMyTurn: boolean = false;
  // isMyRivalTurn : boolean = false;
  
  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit() {

    this.playerName = window.prompt("Seu nome", 'joão');
    this.hubConnection = new signalR
                            .HubConnectionBuilder()
                            .withUrl("http://localhost:62161/gameHub")
                            .configureLogging(signalR.LogLevel.Information)
                            .build();
   
    this.hubConnection
    .start()
    .then(() => console.log('Connection started!'))
    .catch(err => console.log('Erro ao tentar conectar no signalR :('));

    // this.hubConnection.on('ReceiveMessage', (nick: string, receivedMessage: string) => {
    //   const text = `${nick}: ${receivedMessage}`;
    //   this.messages.push(text);
    // });

    this.hubConnection.on('ReceberJogada', (playerName: string, posX: number, posY: number ) => {      
      if (playerName.toUpperCase() != this.playerName.toUpperCase()){
          this.jogoDaVelhaService.jogar(posX, posY);
          this.playerNameRival = playerName;
          console.log("Player: " + this.playerName);
          console.log("PlayerRival: " + this.playerNameRival);
      }
    });

    this.hubConnection.on('NotificarNovaPartida', (playerName: string) => {
      
      if (playerName.toUpperCase() != this.playerName.toUpperCase()){
        this.jogoDaVelhaService.novoJogo();
      }   
     
    });

    this.hubConnection.on('NotificarNovaPartidaZerar', (playerName: string) => {
      if (playerName.toUpperCase() != this.playerName.toUpperCase()){
        this.jogoDaVelhaService.novoJogoZerar();
      }      
    });

    // this.hubConnection.on("NotificarPosicaoJogador", (playerName: string, posicaoJogador : number) => {
    //   if (playerName.toUpperCase() == this.playerName.toUpperCase() && posicaoJogador == this.jogoDaVelhaService.jogador){
    //     this.isMyTurn = true;
    //     this.isMyRivalTurn = false;
    //     //alert(this.jogoDaVelhaService.jogador);
    //     this.playerName = playerName;
    //   }else{
    //     this.isMyTurn = false;
    //     this.isMyRivalTurn = true;
    //     this.playerNameRival = playerName;
    //   }    
    // });

    this.jogoDaVelhaService.inicializar();
  }

  // public sendMessage(): void {   
  //   this.hubConnection
  //     .invoke('SendMessage', this.nick, this.message)
  //     .catch(err => console.error(err));
  // }

  // retorna se a tela de inicio deve ser exibida.
  get showInicio(): boolean {
    return this.jogoDaVelhaService.ShowInicio;
  }

  // retorna se o tabuleiro deve ser exibido
  get showTabuleiro(): boolean {
    return this.jogoDaVelhaService.showTabuleiro;
  }

  //retorna se a tela final deve ser exibida.
  get showFinal(): boolean {
    return this.jogoDaVelhaService.showFinal;
  }

  iniciarJogo(): void {
    this.jogoDaVelhaService.iniciarJogo();

    // this.hubConnection
    // .invoke('VerificaPosicaoJogador', this.playerName)
    // .catch(err => console.error(err));

  }

  jogar(posX: number, posY: number): void {
    this.jogoDaVelhaService.jogar(posX, posY);

    this.hubConnection
    .invoke('Jogar', this.playerName ,posX, posY)
    .catch(err => console.error(err));
  }

  exibirX(posX: number, posY: number) : boolean{
    return this.jogoDaVelhaService.exibirX(posX, posY);
  }

  exibirO(posX: number, posY: number): boolean{
    return this.jogoDaVelhaService.exibirO(posX, posY);
  }

  exibirVitoria(posX: number, posY: number): boolean{
    return this.jogoDaVelhaService.exibirVitoria(posX, posY);
  }

  get jogador(): number {

    return this.jogoDaVelhaService.jogador;
  }

  // get myTurn() : boolean{
  //   return this.myTurn;
  // }

  // get myRivalTurn() : boolean {
  //   return this.myRivalTurn;
  // }

  novoJogo(): void{
    this.jogoDaVelhaService.novoJogo();

    this.hubConnection
    .invoke('NovaPartida', this.playerName)
    .catch(err => console.error(err));
  }

  get placarPlayer1() : number{
    return this.jogoDaVelhaService.placarPlayer1;
  }

  get placarPlayer2() : number{
    return this.jogoDaVelhaService.placarPlayer2;
  }

  novoJogoZerar() : void{
    this.jogoDaVelhaService.novoJogoZerar();

    this.hubConnection
    .invoke('NovaPartidaZerar', this.playerName)
    .catch(err => console.error(err));

  }
}
