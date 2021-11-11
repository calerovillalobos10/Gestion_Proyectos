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

  constructor(
    private service: AdvancesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setTableOptions();
    this.loadTable();
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
        this.alertService.simpleAlert('Se elimino correctamente');
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
  }

  loadTable() {
    
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [{  fechaAvance: "2020-02-01", funcionarioAplicativo: 'Luis A', trimestre: 1, idAvance: 1, solicitud: 1, documento: '../../../assets/book/book.pdf'}];

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
      if (element.idAvance === id) {
        solicitude = element;
      }
    });
    return solicitude;
  }

}