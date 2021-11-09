import { AlertService } from '@core/services/alert/alert.service';
import { Avance } from './../../../../../../core/models/Avance';
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
    this.service.modalNeeded.emit({ subject: 'detailsModal', status: true });
  }

  addAdvance() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  editAdvance(id: number) {
    this.service.modalNeeded.emit({ subject: 'edtModal', status: true, departamentId: id });
  }

  setTableOptions() {
    this.dtOptions = {
      destroy: true,
      processing: true,
      dom: 'Bfrtilp',
      buttons: [
        {
          extend: "copy",
          className: "btn_table copy",
          text: "<i class='far fa-copy'></i>",
          tag: "data-toggle='tooltip' data-placement='top' title='Copiar al Portapapeles'"
        },
        {
          extend: "excel",
          className: "btn_table excel",
          text: "<i class='far fa-file-excel'></i>",
          tag: "data-toggle='tooltip' title='Descargar en excel'"
        },
        {
          extend: "pdf",
          className: "btn_table pdf",
          text: "<i class='far fa-file-pdf'></i>",
          tag: "data-toggle='tooltip' data-placement='top' title='Descargar en pdf'"
        }
      ],
      language: {
        "url": '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
        buttons: {
          copyTitle: 'Copiado al portapapeles',
          copySuccess: {
            _: 'Copiadas %d filas',
            1: 'Copiada 1 fila'
          },
        }
      },

      responsive: true,
      scrollY: '50vh',
      paging: false,
      colReorder: false,
    }
  }


  loadTable() {
    
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [{  fechaAvance: "2020-02-01", funcionarioAplicativo: 'Luis A', trimestre: 'Primer Trimestre', idAvance: 1, solicitud: 1, documento: '../../../assets/book/book.pdf'}];

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