import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { AdvancesService } from '@core/services/advances/advances.service';
import { Subject } from 'rxjs';
import { Avance } from '@core/models/Avance';

import { AlertService } from '@core/services/alert/alert.service';
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
  public dtOptions: any = {};
  public dtTrigger: Subject<any>;
  private solicitudId: number;

  constructor(
    private service: SolicitudeService,
    private advanceService: AdvancesService,
    private alertService: AlertService
  ) {
    super();
    
    this.dtTrigger = new Subject<any>();
    this.solicitudId = -1;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.setTableOptions();
    this.loadTable()

    this.service.modalNeeded.subscribe(data => {
    
      if (data.subject === 'relModal') {
        this.dtTrigger = new Subject<any>();
        this.openedModal = data.status
        this.formToggle = !data.status
        this.solicitudId = data.solicitudId
        this.loadTable()
      }
    })
  }

  loadTable() {
    
    this.advanceService.getBySolicitude(this.solicitudId).subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [{  fechaAvance: "2020-02-01", funcionarioAplicativo: 'Luis A', trimestre: 1, idAvance: 1, solicitud: 1, documento: '../../../assets/book/book.pdf'}];
        this.rerender();
      })
  }

  setTableOptions() {
    this.dtOptions = DT_OPTIONS
  }

  onCloseModal(){
    this.dtTrigger.unsubscribe();
    this.closeModal();
  }

  rerender(): void {
    $('#related').DataTable().destroy();  
    this.dtTrigger.next();
  }

}