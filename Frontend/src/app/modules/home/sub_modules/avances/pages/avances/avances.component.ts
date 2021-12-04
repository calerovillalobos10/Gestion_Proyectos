import { FormControl } from '@angular/forms';
import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { AlertService } from '@core/services/alert/alert.service';
import { Avance } from '@core/models/Avance';
import { Subject } from 'rxjs';
import { AdvancesService } from '@core/services/advances/advances.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.scss']
})
export class AvancesComponent implements OnInit {

  public allRows: Array<Avance> = [];

  dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();


  public filteredRows: Array<Avance> = [];

  public minDateAllowed:string;
  public maxDateAllowed:string;

  public maxDateFiltered1:string;
  public minDateFiltered2:string;
 
  public formControlMin:FormControl;
  public formControlMax:FormControl;

  constructor(
    private service: AdvancesService,
    private alertService: AlertService
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
    this.loadTable();
    this.add_Listeners();


    this.service.updateNeeded.subscribe((data) => {
      if (data) {
        this.loadTable();
      }
    })
  }

  deleteAdvance(id:any){
    
    const advance: Avance | undefined = this.getAdvance(id);

    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Registro: ${advance!.idAvance}`)
      .then(async (res) => {
        // Confirmacion del usuario
        if (res.isConfirmed) {
          this.proceedDelete(id);
        }
      })
  }
  proceedDelete(id: any) {
    this.service.deleteById(id).subscribe(res => {
      if(res['estado']){
        this.alertService.simpleAlert('Se eliminó correctamente');
        this.loadTable();
      }else{
        this.alertService.simpleAlert('Surgió un error al eliminar');
      }
    },
    err => {
      this.alertService.simpleAlert('Surgió un error al eliminar');
    })
  }

  detailsAdvance(id:any){
    this.service.modalNeeded.emit({ subject: 'detModal', status: true.valueOf, advanceId: id });
  }

  addAdvance() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  editAdvance(id:any) {
    this.service.modalNeeded.emit({ subject: 'edtModal', status: true, advanceId: id });
  }

  setTableOptions(){
    this.dtOptions = DT_OPTIONS;
    this.dtOptions.columns = [
      { title: 'Id', data: 'idAvance', orderable: true },
      { title: 'Trimestre', data: 'descripcion', orderable: true },
      { title: 'Aplicativo', data: 'funcionarioAplicativo', orderable: true },
      { title: '# Solicitud', data: 'fechaAvance', orderable: true },
      { title: 'Fecha de avance', data: 'solicitud', orderable: true },
      { title: 'Acciones', searchable: false, orderable: true },
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
      })
  }

  rerender(): void {
    $('#data').DataTable().destroy();  
    this.dtTrigger.next();
  }

  // Obtiene el funcionario de la lista.
  getAdvance(id: number) {
    let solicitude: Avance | undefined = undefined;
    this.allRows.forEach((element) => {
    
      if (element.idAvance == id) {
        solicitude = element;
      }
    });
    return solicitude;
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

    // Agrega eventos de escucha a los botones de la tabla
    add_Listeners() {
      const table = $('#data').DataTable()
  
      $('tbody').on("click", "div.editar", (evt) => {
        const selectedId = evt.target.closest('.row').id;
        this.editAdvance(selectedId)
      });
  
      $('tbody').on("click", "div.eliminar", (evt) => {
        const selectedId = evt.target.closest('.row').id;

        
        

        this.deleteAdvance(selectedId)
      });
  
      $('tbody').on("click", "div.detalle", (evt) => {
        const selectedId = evt.target.closest('.row').id;
        this.detailsAdvance(selectedId)
      });
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
      const date = new Date(row.fechaAvance);
      return(date >= minDate && date <= maxDate);
    })

    this.rerender();
  }

}

