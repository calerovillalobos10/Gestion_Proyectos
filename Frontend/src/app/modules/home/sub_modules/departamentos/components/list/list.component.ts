import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { AlertService } from '@core/services/alert/alert.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Component, OnInit, HostListener, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @ViewChild('lineTmpl', { static: true }) lineTmpl: TemplateRef<any> | undefined;
  @ViewChild('actionTmpl', { static: true }) actionTmpl: TemplateRef<any> | undefined;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any> | undefined;

  public filterForm!: FormGroup;
  private lastFilter: string;

  public columns: any = [];
  private allRows: any = [];
  public filteredRows: any = [];

  ColumnMode = ColumnMode;

  ngOnInit(): void {

    this.loadTable();
    this.filteredRows = this.allRows;

    this.service.updateNeeded.subscribe((data) => {
      if (data) {
        this.loadTable();
      }
    })

    this.columns = [
      { name: 'idDepartamento', title: 'Código', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl },
      { name: 'descripcion', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl },
      { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }];
  }

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private service: DepartamentosService
  ) {
    this.lastFilter = '';
    this.filterForm = this.formBuilder.group({
      filter: ["", [Validators.required]]
    })
  }

  loadTable() {
    this.allRows = this.service.getAll();
    this.allRows = fixedData;
    this.applyFilter();
  }

  // Actualiza el ultimo filtro utilizado
  filterTable() {
    this.lastFilter = this.filterForm.value.filter;
    this.applyFilter();
  }

  // Aplica el filtro
  applyFilter() {
    if (this.lastFilter !== '') {
      this.filteredRows = [];
      this.allRows.forEach((element: { descripcion: string; }) => {
        if (element.descripcion.toLocaleLowerCase().startsWith(this.filterForm.value.filter.toLocaleLowerCase())) {
          this.filteredRows.push(element)
        }
      });
    } else {
      this.filteredRows = this.allRows;
    }
  }

  // Actualiza la tabla
  updateTable() {
    this.lastFilter = '';
    this.filterForm.patchValue({'filter': ''})
    this.allRows = this.service.getAll() //----------------------------------------------Al tener el back--------------------------------
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

          if (this.service.deleteById(id)) {
            this.alertService.simpleAlert('Se eliminó el registro');
            this.loadTable();
          } else {
            this.alertService.simpleAlert('Surgió un error al eliminar'); //----------------------------------------------Al tener el back--------------------------------
          }

          this.filteredRows = fixedDelete(this.filteredRows, id);
          this.alertService.simpleAlert('Se eliminó el registro');
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
}


/* Datos de prueba para eliminar*/
const fixedData = [{ idDepartamento: 1, descripcion: 'Recursos Humanos' }, { idDepartamento: 2, descripcion: 'Contabilidad' },]

const fixedDelete: any = (filteredRows: any[], id: number) => {
  filteredRows = filteredRows.filter(function (element: { idDepartamento: number; }) {
    return element.idDepartamento !== id;
  })
  return filteredRows;
}