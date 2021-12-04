import { FormControl } from '@angular/forms';
import { Bitacora } from '@core/models/Bitacora';
import { BitacorasService } from '@core/services/bitacora/bitacoras.service';
import { Subject } from 'rxjs';
import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {
 
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public allRows:Array<Bitacora> = []

  public filteredRows: Array<Bitacora> = [];

  public minDateAllowed:string;
  public maxDateAllowed:string;

  public maxDateFiltered1:string;
  public minDateFiltered2:string;
 
  public formControlMin:FormControl;
  public formControlMax:FormControl;

  constructor(
    private service:BitacorasService
  ) { 
    this.minDateAllowed="2015-01-01";
    this.maxDateAllowed="2025-01-01";

    this.formControlMin = new FormControl('');
    this.formControlMax = new FormControl('');

    this.maxDateFiltered1 = this.maxDateAllowed;
    this.minDateFiltered2 = this.minDateAllowed;
  }

  ngOnInit(): void {
    this.setTableOptions();
    this.loadTable()
  }

  setTableOptions() {
    this.dtOptions = DT_OPTIONS
    this.dtOptions.columns = [
     
      { title: 'Transaccion', data: 'idTransaccion', orderable: true },
      { title: 'Funcionario', data: 'idFuncionario', orderable: true },
      { title: 'Avance', data: 'idAvance', orderable: true },
      { title: 'Solicitud', data: 'idSolicitud', orderable: true },
      { title: 'Fecha', data: 'fecha', orderable: true },
    ]

  }

  loadTable() {
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
        this.removeFilters();
        this.filteredRows = this.allRows;
        this.rerender();
      },
      err => {
        this.allRows = [];
        this.removeFilters();
        this.filteredRows = this.allRows;
        this.rerender();
      }
    )
  }

   // Vuelve a los minimos por defecto en fechas
   removeMinDate(){
    if(this.formControlMin.value!=''){
      this.formControlMin.patchValue('');
      this.minDateFiltered2 = this.minDateAllowed;
      this.filterBetween();
    }
  }

  // Vuelve a los minimos por defecto en fechas
  removeMaxDate(){
    if(this.formControlMax.value!=''){
      this.formControlMax.patchValue('');
      this.maxDateFiltered1= this.maxDateAllowed;
      this.filterBetween();
    }
  }

  changeMinDate(evt:any){
    if((new Date(evt.target.value).toString() == 'Invalid Date')){
      evt.target.value = this.minDateFiltered2;
    }else{
      this.minDateFiltered2 = evt.target.value;
    }
    this.filterBetween();
  }

  changeMaxDate(evt:any){
    if((new Date(evt.target.value).toString() == 'Invalid Date')){
      evt.target.value = this.maxDateFiltered1;
    }else{
      this.maxDateFiltered1 = evt.target.value;
    }
    this.filterBetween();
  }

  removeFilters(){
    this.removeMinDate();
    this.removeMaxDate();
  }

  rerender(): void {
    $('#table').DataTable().destroy();
    this.dtTrigger.next();
  }

    // Este metodo filtra entre fechas.
    filterBetween(){

      // Si el filtro actual es invalido toma el minimo permitido
      const minDate = new Date(this.formControlMin.value).toString() != 'Invalid Date' 
                      ? new Date(this.formControlMin.value) : new Date(this.minDateAllowed);
  
      // Si el filtro actual es invalido toma el maximo permitido
      const maxDate = new Date(this.formControlMax.value).toString() != 'Invalid Date' 
                      ? new Date(this.formControlMax.value) : new Date(this.maxDateAllowed);
  
      this.filteredRows = this.allRows.filter(row => {
        const date = new Date(row.fechaBitacora);
        return(date >= minDate && date <= maxDate);
      })
  
      this.rerender();
    }

}