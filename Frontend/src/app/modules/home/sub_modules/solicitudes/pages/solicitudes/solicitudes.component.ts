import { Subject } from 'rxjs';
import { SolicitudeService } from '@core/services/solicitude/solicitude.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private service:SolicitudeService
  ) { }

  ngOnInit(): void {
    this.setTableOptions();
  }

  deleteSolicitude(id:any){}

  detailsSolicitude(id:any){
    this.service.modalNeeded.emit({ subject: 'detailsModal', status: true });
  }

  addSolicitude() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  editSolicitude(id: number) {
    this.service.modalNeeded.emit({ subject: 'edtModal', status: true, departamentId: id });
  }

  setTableOptions() {
    this.dtOptions = {
      destroy: true,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
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
        "url": '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
        buttons: {
          copyTitle: 'Copiado al portapapeles',
          copySuccess: {
            _: 'Copiadas %d filas',
            1: 'Copiada 1 fila'
          },
        }
      },

      responsive: true,
      scrollY: '50vh',
      paging: false,
      colReorder: false,
    }
  }

  rerender(): void {
    $('#data').DataTable().destroy();  
    this.dtTrigger.next();
  }



}