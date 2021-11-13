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

  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public allRows: Array<Solicitud> = [];

  constructor(
    private service: SolicitudeService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.setTableOptions();
    this.loadTable()
    this.add_Listeners()
  }

  deleteSolicitude(id: any) {

    const solicitud: any = this.getSolicitude(id);

    console.log(this.allRows)

    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Registro: ${solicitud.idSolicitud}`)
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
    this.service.modalNeeded.emit({ subject: 'detModal', status: true, solicitudeId: id });
  }

  relatedAdvances(id: any) {
    this.service.modalNeeded.emit({ subject: 'relModal', status: true, solicitudId: id });
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
        this.rerender();
      },
      err => {
        this.allRows = [
          { fechaInicio: "2020-02-01", fechaFin: "2020-04-05", fechaSolicitud: "2020-01-01", funcionarioAplicativo: 'Luis Leiton Iglesias', funcionarioResponsable: 'Fernando Alvarez Salas', funcionarioFinal: 'Ana Soto Salas', idSolicitud: 1, documentoActa: '../../../assets/book/book.pdf' },
          { fechaInicio: "2020-05-01", fechaFin: "2020-08-05", fechaSolicitud: "2020-04-01", funcionarioAplicativo: 'Luis Leiton Iglesias', funcionarioResponsable: 'Fernando Alvarez Salas', funcionarioFinal: 'Ana Soto Salas', idSolicitud: 2, documentoActa: '../../../assets/book/book.pdf' },
          { fechaInicio: "2020-10-01", fechaFin: "2020-12-05", fechaSolicitud: "2020-09-01", funcionarioAplicativo: 'Luis Leiton Iglesias', funcionarioResponsable: 'Fernando Alvarez Salas', funcionarioFinal: 'Ana Soto Salas', idSolicitud: 3, documentoActa: '../../../assets/book/book.pdf' }];
        this.rerender();
      }
    )
  }

  rerender(): void {
    $('#table').DataTable().destroy();
    this.dtTrigger.next();
  }

  // Obtiene una solicitud de la lista.
  getSolicitude(id: number) {
    let solicitude: any = undefined;
    solicitude = this.allRows.find(element => element.idSolicitud == id)
    return solicitude;
  }

  // Agrega eventos de escucha a los botones de la tabla
  add_Listeners() {
    const table = $('#data').DataTable()

    $('tbody').on("click", "div.editar", (evt) => {
      const selectedId = evt.target.closest('.row').id;
      this.editSolicitude(selectedId)
    });

    $('tbody').on("click", "div.eliminar", (evt) => {
      const selectedId = evt.target.closest('.row').id;
      this.deleteSolicitude(selectedId)
    });

    $('tbody').on("click", "div.detalles", (evt) => {
      const selectedId = evt.target.closest('.row').id;
      this.detailsSolicitude(selectedId)
    });

    $('tbody').on("click", "div.avances", (evt) => {
      const selectedId = evt.target.closest('.row').id;
      this.relatedAdvances(selectedId)
    });
  }


}