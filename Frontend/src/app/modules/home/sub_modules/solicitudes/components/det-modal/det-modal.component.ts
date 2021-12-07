import { SolicitudeService } from '@core/services/solicitude/solicitude.service';
import { AlertService } from '@core/services/alert/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-det-modal',
  templateUrl: './det-modal.component.html',
  styleUrls: ['./det-modal.component.scss']
})
export class DetModalComponent implements OnInit {

  public pdfSrc: String;
  public formToggle: boolean;
  public openedModal: boolean;
  public solicitudId: number;

  constructor(
    private service: SolicitudeService,
    private alertService: AlertService
  ) {
    this.solicitudId = 0;
    this.formToggle = false;
    this.openedModal = false;
    this.pdfSrc = '';
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
    
      if (data.subject === 'detModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.solicitudId = data.solicitudeId; // Obtener este usuario y mostrarlo
        this.loadAvance();
      }
    })
  }

  async loadAvance() {
    this.service.getDocumentById(this.solicitudId).subscribe(
      res => {
        this.pdfSrc = res['document'];
      },
      err => {
        this.closeOnError();
      }
    )
  }

  async closeModal() {
    this.formToggle = true;
    setTimeout(() => {
      this.openedModal = false
    }, 500)
    this.pdfSrc ='';
  }

  relatedAdvances(id:any){
    this.service.modalNeeded.emit({ subject: 'relModal', status: true, solicitudId: this.solicitudId});
  }

  // Este metodo cierra el modal mostrando una alerta de error.
  closeOnError() {
    this.alertService.promiseAlertError('Surgio un error al cargar la solicitud').then(
      () => {
        this.closeModal();
      }
    )
  }
}