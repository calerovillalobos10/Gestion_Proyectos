import { DT_OPTIONS } from '@core/others/DatatableOptions';
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
    private service: SolicitudeService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setTableOptions();
    this.loadTable()
  }

  deleteSolicitude(id: any) {

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
      if (res['estado']) {
        this.alertService.simpleAlert('Surgió un error al eliminar');
      } else {
        this.alertService.simpleAlert('Surgió un error al eliminar');
      }
    },
      err => {
        this.alertService.simpleAlert('Surgió un error al eliminar');
      })
  }

  detailsSolicitude(id: any) {
    this.service.modalNeeded.emit({ subject: 'detModal', status: true, solicitudeId: id  });
  }

  addSolicitude() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  editSolicitude(id: any) {
    this.service.modalNeeded.emit({ subject: 'edtModal', status: true, solicitudeId: id });
  }

  setTableOptions() {
    this.dtOptions = DT_OPTIONS
    this.dtOptions.columns = [
      { title: 'Id', data: 'idSolicitud', orderable: true },
      { title: 'Aplicativo', data: 'funcionarioResponsable', orderable: true },
      { title: 'Responsable', data: 'funcionarioAplicativo', orderable: true },
      { title: 'Final', data: 'funcionarioFinal', orderable: true },
      { title: 'Fecha de solicitud', data: 'fechaSolicitud', orderable: true },
      { title: 'Fecha de inicio', data: 'fechaInicio', orderable: true },
      { title: 'Fecha de fin', data: 'fechaFin', orderable: true },
      { title: 'Acciones', orderable: false, searchable: false },
    ]
  }

  loadTable() {
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [{ fechaInicio: "2020-02-01", fechaFin: "2020-05-05", fechaSolicitud: "2020-01-01", funcionarioAplicativo: 'Luis A', funcionarioResponsable: 'Luis B', funcionarioFinal: 'Luis C', idSolicitud: 1, documentoActa: '../../../assets/book/book.pdf' }];
        this.rerender();
      }
    )
  }

  rerender(): void {
    $('#data').DataTable().destroy();
    this.dtTrigger.next();
  }

  // Obtiene una solicitud de la lista.
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