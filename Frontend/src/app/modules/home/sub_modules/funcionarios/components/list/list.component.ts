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
  
  public form!: FormGroup;

  rows:any = [];
  public columns:any = [];

  ngOnInit(): void {
    
    this.columns = [];
    this.setColumns(window.innerWidth);
  
    this.rows = fixedData;
  }


  ColumnMode = ColumnMode;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {
    this.form = this.formBuilder.group({
      filter: ["",
        [
          Validators.required
        ]]
      
    })
  }

  loadTable() {
   
  }

  filter_table(){
    alert(this.form.value.filter)
  }

  add_func(){

  }

  detailsFunc(id:number){
    alert('detallando ' + id)
  }

  deleteFunc(id:number){
    alert('eliminando ' + id)
  }

  editFunc(id:number){
    alert('editando ' + id)
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.setColumns(event.target.innerWidth);
  }

  /*
    Asigna un set de columnas acorde al ancho de ventana actual
  */
  setColumns(width:number){
    if(width > 1300){
      this.columns = [
        { name: 'nombre', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
        { name: 'apellido1', title: 'Primer apellido', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
        { name: 'apellido2', title: 'Segundo apellido', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
        { name: 'sexo', title: 'Sexo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
        { name: 'tipo', title: 'Tipo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
        { name: 'departamento', title: 'Departamento',headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
        { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }];
    }else if (width > 950){
      this.columns = [
        { name: 'nombre', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
        { name: 'apellido1', title: 'Primer apellido', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl},
        { name: 'tipo', title: 'Tipo', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl}, 
        { name: 'departamento', title: 'Departamento',headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
        { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }];
    }
    else if (width > 600){
      this.columns = [
        { name: 'nombre', title: 'Nombre', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
        { name: 'apellido1', title: 'Primer apellido', headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl},
        { name: 'departamento', title: 'Departamento',headerTemplate: this.hdrTpl, cellTemplate: this.lineTmpl }, 
        { name: 'acciones', title: 'Acciones', headerTemplate: this.hdrTpl, cellTemplate: this.actionTmpl }];
    }
  } 
}

/* Datos de prueba para eliminar*/
const fixedData = [{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:2, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:3, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:1, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' },
{id:13, nombre: 'Nombre', apellido1: 'Primer apellido', apellido2: 'Primer apellido', departamento: 'Primer departamento', sexo: 'H', tipo: 'Tipo' }]