import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  dtOptions: any = {};


  constructor() { }

  ngOnInit(): void {
    this.setTableOptions();
  }


  setTableOptions() {
    this.dtOptions = {
      destroy: true,
      dom: 'Bfrtip',
      buttons:[
        {
            extend: "copy",
            className: "btn_table copy",
            text: "<i class='far fa-copy'></i>",
            tag: "data-toggle='tooltip' data-placement='top' title='Copiar al Portapapeles'"
        },
        {
            extend: "excel",
            className: "btn_table excel",
            text: "<i class='far fa-file-excel'></i>",
            tag: "data-toggle='tooltip' title='Descargar en excel'"
        },
        {
            extend: "pdf",
            className: "btn_table pdf",
            text: "<i class='far fa-file-pdf'></i>",
            tag: "data-toggle='tooltip' data-placement='top' title='Descargar en pdf'"
        }
    ],
      language: {
        "url": '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      responsive: true,
      scrollY:    '50vh',
      paging:     false,
      colReorder: false
      

    }

  }
}