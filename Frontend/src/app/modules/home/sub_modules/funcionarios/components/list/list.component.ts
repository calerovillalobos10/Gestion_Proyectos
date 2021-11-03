import { FuncionariosService } from './../../../../../../core/services/funcionarios/funcionarios.service';
import { AlertService } from '@core/services/alert/alert.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  private allRows:any = [];
  public filteredRows:any = [];

  public columns:any = [];

  ngOnInit(): void {
    
    this.columns = [];
    this.setColumns(window.innerWidth);
  
    this.loadTable();
    this.filteredRows = this.allRows;

    this.service.updateNeeded.subscribe((data)=> {
      if(data){
        this.loadTable();
      }
    })

  }

  ColumnMode = ColumnMode;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private service:FuncionariosService
  ) {
  
    this.lastFilter = '';
    this.filterForm = this.formBuilder.group({
      filter: ["", [ Validators.required ]] })

  }

  async loadTable() {
    //this.allRows = await this.service.getAll() ----------------------------------------------Al tener el back--------------------------------
    this.allRows = fixedData;
    this.applyFilter();
  }

  // Para filtrar la tabla de funcionarios.
  filter_table(){
    this.lastFilter = this.filterForm.value.filter;
    this.applyFilter();
  }

  // Aplica el filtro
  applyFilter(){
    if(this.lastFilter !== ''){
      this.filteredRows = [];
      this.allRows.forEach((element: { nombre: string; }) => {
        if(element.nombre.toLocaleLowerCase().startsWith(this.filterForm.value.filter.toLocaleLowerCase())){
          this.filteredRows.push(element)
        }
      });
    }else{
      this.filteredRows = this.allRows;
    }
  }

  // Actualiza la tabla
  updateTable(){
    this.lastFilter = '';
    this.filterForm.patchValue({'filter': ''})
    this.allRows = this.service.getAll() //----------------------------------------------Al tener el back--------------------------------
  }

  // Llama al modal correspondiente de agregar
  add_func(){
    this.service.modalNeeded.emit({subject: 'addModal', status:true});
  }

  // Llama al modal correspondiente de detalles
  detailsFunc(id:number){
    this.service.modalNeeded.emit({subject: 'detModal', status:true, userId: id});
  }

  async deleteFunc(id:number){
    const func:any = this.getFunc(id);
    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Registro: ${func.nombre} ${func.apellido1} ${func.apellido2}`)
    .then(async (res) => {

      // Confirmacion del usuario
      if(res.isConfirmed){

        // Confirmacion del servidor.
        /*
        if(await this.service.deleteById(id)){
          this.alertService.simpleAlert('Se eliminó el registro');
          this.loadTable();
        }else{
          this.alertService.simpleAlert('Surgió un error al eliminar'); ----------------------------------------------Al tener el back--------------------------------
        }*/

        this.filteredRows = fixedDelete(this.filteredRows,id);
        this.alertService.simpleAlert('Se eliminó el registro');
      }
    })
  }

  // Llama al modal correspondiente de editar
  editFunc(id:number){
    this.service.modalNeeded.emit({subject: 'editModal', status:true, userId: id});
  }
  

  // Obtiene el funcionario de la lista.
  getFunc(id: number) {
    let func = null;
    this.allRows.forEach((element: { id: number; }) => {
      if(element.id === id){
        func = element;
      }
    });
    return func;
   }
 

  /*
    Asigna el reajuste de cantidad de columnas segun el evento de resize.
  */
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setColumns(event.target.innerWidth);
  }


  /*
    Asigna un set de columnas acorde al ancho de ventana actual
  */
  setColumns(width:number){
    this.columns = [
      { name: 'nombre', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
      { name: 'apellido1', title: 'Primer apellido', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, ]

    if(width > 1300){
      this.columns = [...this.columns,
        { name: 'apellido2', title: 'Segundo apellido', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
        { name: 'sexo', title: 'Sexo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
      ];
    }
    
    if (width > 950){
      this.columns = [...this.columns,
        { name: 'tipo', title: 'Tipo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
      ];
    }

    this.columns = [...this.columns,
      { name: 'departamento', title: 'Departamento',headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
      { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }]
  } 

}




/* Datos de prueba para eliminar*/

const fixedDelete:any = (filteredRows: any[], id: number) => {
  filteredRows = filteredRows.filter(function (element: { id: number; }) {
    return element.id !== id;
  })
  return filteredRows;
}

const fixedData = [{id:1, nombre: 'Alberto', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:2, nombre: 'Juan', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:3, nombre: 'Marcos', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:4, nombre: 'Pedro', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:5, nombre: 'Luis', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:6, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:7, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:8, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:9, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:10, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:11, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:13, nombre: 'aa', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' }]