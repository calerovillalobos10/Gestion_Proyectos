import { Bitacora } from './../../../../../core/models/Bitacora';
import { BitacorasService } from './../../../../../core/services/bitacora/bitacoras.service';
import { Subject } from 'rxjs';
import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {
 
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public allRows:Array<Bitacora> = []

  constructor(
    private service:BitacorasService
  ) { }

  ngOnInit(): void {
    this.setTableOptions();
    this.loadTable()
  }

  setTableOptions() {
    this.dtOptions = DT_OPTIONS
    this.dtOptions.columns = [
      { title: 'Id', data: 'idBitacora', orderable: true },
      { title: 'Transaccion', data: 'idTransaccion', orderable: true },
      { title: 'Funcionario', data: 'idFuncionario', orderable: true },
      { title: 'Avance', data: 'idAvance', orderable: true },
      { title: 'Solicitud', data: 'idSolicitud', orderable: true },
      { title: 'Fecha', data: 'fecha', orderable: true },
    ]

  }

  loadTable() {
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
        this.rerender();
      },
      err => {
        this.allRows = fixedData;
        this.rerender();
      }
    )
  }

  rerender(): void {
    $('#table').DataTable().destroy();
    this.dtTrigger.next();
  }

}

const fixedData = [
  { idBitacora: 1, idAvance:'N/A', fechaBitacora: '2021-01-01', idFuncionario: 'Luis Leiton Iglesias', idTransaccion: "Insert en tabla de solicitudes", idSolicitud: 1},
  { idBitacora: 2, idAvance:'1', fechaBitacora: '2021-01-01', idFuncionario: 'Ana Soto Salas', idTransaccion: "Insert en tabla de avances", idSolicitud: 1},
  { idBitacora: 3, idAvance:'N/A', fechaBitacora: '2021-01-01', idFuncionario: 'Luis Leiton Iglesias', idTransaccion: "Update en tabla de solicitudes", idSolicitud: 2},
 
]