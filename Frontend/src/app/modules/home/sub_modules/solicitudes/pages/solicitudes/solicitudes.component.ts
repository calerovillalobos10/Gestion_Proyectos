import { Solicitud } from '@core/models/Solicitud';
import { AlertService } from '@core/services/alert/alert.service';
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
  public allRows: Array<Solicitud> = [];

  constructor(
    private service:SolicitudeService,
    private alertService: AlertService
  ) {

    this.loadTable()
   }

  ngOnInit(): void {
    this.setTableOptions();
  }

  deleteSolicitude(id:any){

    const solicitud: Solicitud | undefined = this.getSolicitude(id);
    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Registro: ${solicitud!.idSolicitud}`)
      .then(async (res) => {
        // Confirmacion del usuario
        if (res.isConfirmed) {
          this.proceedDelete(id);
        }
      })
  }
  proceedDelete(id: any) {
    this.service.deleteById(id).subscribe(res => {
      if(res['estado']){
        this.alertService.simpleAlert('Surgió un error al eliminar');
      }else{
        this.alertService.simpleAlert('Surgió un error al eliminar');
      }
    },
    err => {
      this.alertService.simpleAlert('Surgió un error al eliminar');
    })
  }

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

  
  loadTable() {
    
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [{fechaInicio: "2020-02-01", fechaFin: "2020-05-05", fechaSolicitud: "2020-01-01", funcionarioAplicativo: 'Luis A', funcionarioResponsable: 'Luis B', funcionarioFinal: 'Luis C', idSolicitud: 1, documentoActa: '../../../assets/book/book.pdf'}];

        this.rerender();
      })
  }


  rerender(): void {
    $('#data').DataTable().destroy();  
    this.dtTrigger.next();
  }

  // Obtiene el funcionario de la lista.
  getSolicitude(id: number) {
    let solicitude: Solicitud | undefined = undefined;
    this.allRows.forEach((element) => {
      if (element.idSolicitud === id) {
        solicitude = element;
      }
    });
    return solicitude;
  }


}