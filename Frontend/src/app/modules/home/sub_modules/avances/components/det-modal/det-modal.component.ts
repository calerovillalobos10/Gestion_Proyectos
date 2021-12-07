import { Avance } from '@core/models/Avance';
import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { AdvancesService } from '@core/services/advances/advances.service';

@Component({
  selector: 'app-det-modal',
  templateUrl: './det-modal.component.html',
  styleUrls: ['./det-modal.component.scss']
})
export class DetModalComponent implements OnInit {

  public avance: Avance | undefined;
  public pdfSrc: String;
  public formToggle: boolean;
  public openedModal: boolean;
  public advanceId: number;

  constructor(
    private service: AdvancesService,
    private alertService: AlertService
  ) {
    this.advanceId = 0;
    this.formToggle = false;
    this.openedModal = false;
    this.pdfSrc = '';
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      
    console.log(data);
    
      if (data.subject === 'detModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.advanceId = data.advanceId; // Obtener este usuario y mostrarlo
        this.loadAvance();
      }
    })
  }

  async loadAvance() {
    this.service.getDocumentById(this.advanceId).subscribe(
      res => {
        console.log(res);
        
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
    this.pdfSrc = '';
  }

  // Este metodo cierra el modal mostrando una alerta de error.
  closeOnError() {
    this.alertService.promiseAlertError('Surgio un error al cargar el avance').then(
      () => {
        this.closeModal();
      }
    )
  }
}