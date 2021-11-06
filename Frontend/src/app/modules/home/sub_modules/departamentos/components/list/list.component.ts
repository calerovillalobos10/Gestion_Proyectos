import { Departamento } from '@core/models/Departamento';
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
     
      { name: 'descripcion', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl, width: 250 },
      { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl, width: 10 }];
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
    this.service.getAll().subscribe(
      (res) => {
        this.allRows = !res['estado'] ? [] : res['list'];
        this.applyFilter();
      },
      (err) => {
        this.allRows = [];
        this.applyFilter();
      }
    )
    
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
    this.filterForm.patchValue({ 'filter': '' })
    this.service.getAll().subscribe(
      (res) => {
        this.allRows = !res['estado'] ? [] : res['list'];
        this.applyFilter();
      },
      (err) => {
        this.allRows = [];
        this.applyFilter();
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
            (res)=>{
              
             

              if(res['estado']){
                this.alertService.simpleAlert('Se eliminó el registro');
                this.loadTable();
              }else{
                this.alertService.simpleAlert('Surgió un error al eliminar');
              }
            },
            (err)=>{
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
}