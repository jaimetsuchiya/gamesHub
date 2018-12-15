import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { JogoDaVelhaService } from './jogodavelha.service';

@Component({
  selector: 'app-jogodavelha',
  templateUrl: './jogodavelha.component.html',
  styleUrls: ['./jogodavelha.component.css']
})

export class JogoDaVelhaComponent implements OnInit{
  

  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit() {
    this.jogoDaVelhaService.inicializar();
  }

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
  }

  jogar(posX: number, posY: number): void {
    this.jogoDaVelhaService.jogar(posX, posY);
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

  novoJogo(): void{
    this.jogoDaVelhaService.novoJogo();
  }

  get placarPlayer1() : number{
    return this.jogoDaVelhaService.placarPlayer1;
  }

  get placarPlayer2() : number{
    return this.jogoDaVelhaService.placarPlayer2;
  }

  novoJogoZerar() : void{
    this.jogoDaVelhaService.novoJogoZerar();
  }
}
