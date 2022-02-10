import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //providers: [EventoService]
})
export class EventosComponent implements OnInit {
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
    (    evento: { tema: string; local: string;}) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
                                                     evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1


  )
}

constructor(
  private eventoService: EventoService,
  private modalService: BsModalService,
  private toastr: ToastrService,
  private spinner: NgxSpinnerService){}
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

}
