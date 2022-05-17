import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef
  public eventos: Evento[]= [];
  public eventosFiltrados: Evento[]= [];

widthImag: number = 50;
marginImg: number  = 2;
exibirImg: boolean = true;
private _filtroLista: string = '';

public get filtroLista(){
    return this._filtroLista;
}

public set filtroLista(value: string){
  this._filtroLista = value;
  this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
}

filtrarEventos(filtrarPor: string): Evento[] {
  filtrarPor = filtrarPor.toLocaleLowerCase();
  return this.eventos.filter(
    (    evento: {id:number; tema: string; local: string; qtdPessoas: number; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                                                    evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                                                    evento.qtdPessoas.toString().indexOf(filtrarPor) !== -1 ||
                                                    evento.id.toString().indexOf(filtrarPor) !== -1


  )
}

constructor(
  private eventoService: EventoService,
  private modalService: BsModalService,
  private toastr: ToastrService,
  private spinner: NgxSpinnerService,
  private router: Router){}
alterarImg(){
  this.exibirImg = !this.exibirImg;
}


  public ngOnInit(): void {
    this.getEventos();

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after x seconds */

    }, 10000);

  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
          this.eventos = eventos;
          this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao recuperar os eventos!', 'Erro!');

        setTimeout(() => {
          /** spinner ends after x seconds */

        }, 2000);
      },
      complete: () => this.spinner.hide()
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Evento deletado com sucesso!', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }


  detalheEvento(id: number): void{
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
