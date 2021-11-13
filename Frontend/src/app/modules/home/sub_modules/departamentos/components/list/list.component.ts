import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { Subject } from 'rxjs';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { AlertService } from '@core/services/alert/alert.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  public dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: any = {};
  public allRows: any = [];

  constructor(
    private alertService: AlertService,
    private service: DepartamentosService,
  ) { }

  ngOnInit(): void {
    this.service.updateNeeded.subscribe((data) => {
      if (data) {
        this.updateTable();
      }
    })

    this.setTableOptions();
    this.updateTable();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Actualiza la tabla
  updateTable() {

    this.service.getAll().subscribe(
      (res) => {
        if (res['estado']) {
          this.allRows = res['list'];
          this.rerender();
        }
      }
    )
  }

  add_dept() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  editDept(id: number) {
    this.service.modalNeeded.emit({ subject: 'editModal', status: true, departamentId: id });
  }

  deleteDept(id: number) {
    const dept: any = this.getDept(id);
    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Departamento: ${dept.descripcion}`)
      .then((res) => {

        // Confirmacion del usuario
        if (res.isConfirmed) {

          // Confirmacion del servidor.
          this.service.deleteById(id).subscribe(
            (res) => {
              if (res['estado']) {
                this.alertService.simpleAlert('Se eliminó el registro');
                this.updateTable();
              } else {
                this.alertService.simpleAlert('Surgió un error al eliminar');
              }
            },
            (err) => {
              this.alertService.simpleAlert('Surgió un error al eliminar');
            })
        }
      })
  }

  getDept(id: number) {
    let dept = null;
    this.allRows.forEach((element: { idDepartamento: number; }) => {
      if (element.idDepartamento === id) {
        dept = element;
      }
    });
    return dept;
  }

  setTableOptions() {
    this.dtOptions = DT_OPTIONS
    this.dtOptions.columns = [
      { title: 'Departamento', data: 'descripcion', orderable: true },
      { title: 'Acciones', orderable: false, searchable: false },
    ]
  }

  rerender(): void {
    /*
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
    });
    */
    $('#data').DataTable().destroy();  
    this.dtTrigger.next();
  }

}