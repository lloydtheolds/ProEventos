import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [{
    Tema: 'Pandaria',
    Local: 'Cariacica'
  },
  {
    Tema: 'WoD',
    Local: 'Cariacica'
  },
  {
    Tema: 'Legion',
    Local: 'Cariacica'
  },
  {
    Tema: 'BfA',
    Local: 'Cariacica'
  },
  {
    Tema: 'ShadowLands',
    Local: 'Cariacica'
  },
]


  constructor() { }

  ngOnInit(): void {
  }

}
