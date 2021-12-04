import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { AdvancesService } from '@core/services/advances/advances.service';
import { Subject } from 'rxjs';
import { Avance } from '@core/models/Avance';

import { SolicitudeService } from '@core/services/solicitude/solicitude.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { ModalSkeleton } from '@core/others/ModalSkeleton';

@Component({
  selector: 'app-related-advances',
  templateUrl: './related-advances.component.html',
  styleUrls: ['./related-advances.component.scss']
})

export class RelatedAdvancesComponent extends ModalSkeleton implements OnInit, OnDestroy{

  public allRows: Array<Avance> = [];
  public dtOpt: any = {};
  public dtTri: Subject<any>;
  public solicitudId: number;

  constructor(
    private service: SolicitudeService,
    private advanceService: AdvancesService
  ) {
    super();
    
    this.dtTri = new Subject<any>();
    this.solicitudId = -1;
  }

  ngOnDestroy(): void {
    this.dtTri.unsubscribe();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
    
      if (data.subject === 'relModal') {

        this.dtTri = new Subject<any>();
        this.setTableOptions();
        this.loadTable()
        this.openedModal = data.status
        this.formToggle = !data.status
        this.solicitudId = data.solicitudId
      }
    })
  }

  loadTable() {
    
    this.advanceService.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
        this.filterRows();
        this.rerender();
      },
      err => {
        this.allRows = [];
        this.rerender();
      })
  }

  setTableOptions() {
    this.dtOpt = DT_OPTIONS
    this.dtOpt.columns = [
      { title: 'Id', data: 'idAvance', orderable: true },
      { title: 'Trimestre', data: 'trimestre', orderable: true },
      { title: 'Aplicativo', data: 'funcionarioAplicativo', orderable: true },
      { title: '# Solicitud', data: 'fechaAvance', orderable: true },
      { title: 'Fecha de avance', data: 'solicitud', orderable: true },
    ] 
  }

  onCloseModal(){
    this.dtTri.unsubscribe();
    this.closeModal();
  }

  rerender(): void {
    $('#related').DataTable().destroy();  
    this.dtTri.next();
  }

  filterRows(){
    this.allRows = this.allRows.filter(element => element.idSolicitud == this.solicitudId);
  }


}
