import { Funcionario } from '@core/models/Funcionario';
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
  
  private allRows:Array<Funcionario> = [];
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

  loadTable() {
    this.allRows = this.service.getAll();
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
      this.filteredRows = this.allRows.filter((element: { nombre: string; }) => 
        element.nombre.toLocaleLowerCase().startsWith(this.filterForm.value.filter.toLocaleLowerCase()))
    }else{
      this.filteredRows = this.allRows;
    }
  }

  // Actualiza la tabla
  updateTable(){
    this.lastFilter = '';
    this.filterForm.patchValue({'filter': ''})
    this.allRows = this.service.getAll() 
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
    let func:Funcionario | undefined = undefined;
    this.allRows.forEach((element) => {
      if(element.idFuncionario === id){
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
        { name: 'idSexo', title: 'Sexo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
      ];
    }
    
    if (width > 950){
      this.columns = [...this.columns,
        { name: 'idTipoFuncionario', title: 'Tipo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
      ];
    }

    this.columns = [...this.columns,
      { name: 'idDepartamento', title: 'Departamento',headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
      { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }]
  }
}

/* Datos de prueba para eliminar*/
const fixedDelete:any = (filteredRows: any[], id: number) => {
  filteredRows = filteredRows.filter((element: { id: number; }) => element.id !== id)
  return filteredRows;
}