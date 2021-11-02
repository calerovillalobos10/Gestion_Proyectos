import { DepartamentosService } from '@core/services/Departamentos/departamentos.service';
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

  public columns:any = [];
  private allRows:any = [];
  public filteredRows:any = [];

  ColumnMode = ColumnMode;

  ngOnInit(): void {
    
    this.columns = [
      { name: 'idDepartamento', title: 'Código', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
      { name: 'descripcion', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl},
      { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }];

    this.loadTable();
    this.filteredRows = this.allRows;
  }

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private service:DepartamentosService
  ) {
  
    this.filterForm = this.formBuilder.group({
      filter: ["", [ Validators.required ]]
    })
  }

  loadTable() {
    this.allRows = fixedData;
  }

  // Para filtrar la tabla.
  filter_table(){
    if(this.filterForm.valid){
      this.filteredRows = [];
      this.allRows.forEach((element: { descripcion: string; }) => {
        if(element.descripcion.toLocaleLowerCase().startsWith(this.filterForm.value.filter.toLocaleLowerCase())){
          this.filteredRows.push(element)
        }
      });
    }else{
      this.filteredRows = this.allRows;
    }
  }

  add_dept(){
    this.service.modalNeeded.emit({subject: 'addModal', status:true});
  }

  editDept(id:number){
    this.service.modalNeeded.emit({subject: 'editModal', status:true, departamentId: id});
  }
  
  async deleteDept(id:number){
    const dept:any = this.getDept(id);
    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Departamento: ${dept.descripcion}`)
    .then((res) => {
      if(res.isConfirmed){
          this.filteredRows = this.filteredRows.filter(function (element: { id: number; }) {
          return element.id !== id;
        })
        this.alertService.simpleAlert('Se eliminó el registro');
      }
    })
  }

  getDept(id: number) {
   let dept = null;
   this.allRows.forEach((element: { idDepartamento: number; }) => {
     if(element.idDepartamento === id){
       dept = element;
     }
   });
   return dept;
  }

}

/* Datos de prueba para eliminar*/
const fixedData = [{idDepartamento:1, descripcion: 'Recursos Humanos'},{idDepartamento:2, descripcion: 'Contabilidad'},]