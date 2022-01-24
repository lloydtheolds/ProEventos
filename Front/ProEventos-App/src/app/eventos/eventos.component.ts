import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any= [];
  public eventosfiltrados: any= [];

widthImag: number = 50;
marginImg: number  = 2;
exibirImg: boolean = true;
private _filtroLista: string = '';

public get filtroLista(){
    return this._filtroLista;
}

public set filtroLista(value: string){
  this._filtroLista = value;
  this.eventosfiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
}

filtrarEventos(filtrarPor: string): any{
  filtrarPor = filtrarPor.toLocaleLowerCase();
  return this.eventos.filter(
    (    evento: { tema: string; local: string;}) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                                                     evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1


  )
}

constructor(private http: HttpClient){}
alterarImg(){
  this.exibirImg = !this.exibirImg;
}


  ngOnInit(): void {
    this.getEventos();

  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosfiltrados = this.eventos;
      },
      error => console.log(error)
      //complete
    );

  }

}
