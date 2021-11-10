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
  public funcionario_Aplicativo: Funcionario | undefined
  public pdfSrc: String;
  public formToggle: boolean;
  public openedModal: boolean;
  public advanceId: number;

  constructor(
    private service: AdvancesService,
    private functionaryService: FuncionariosService,
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
    this.service.getById(this.advanceId).subscribe(
      res => {
        if (res['estado']) {
          this.avance = res['avance']
          this.pdfSrc = this.avance?.documento;

          this.loadUser();
        } else {
          this.closeOnError();
        }
      },
      err => {
        this.avance = {idAvance: 1, funcionarioAplicativo: 1, trimestre: 1, fechaAvance: '2000-01-01', solicitud: 1, documento:"../../../assets/book/book.pdf"}
        this.funcionario_Aplicativo = {nombre: 'Luis', apellido_1: 'Leiton', apellido_2:'Iglesias', urlFoto:'', correo: 'Luis@gmail', fechaNacimiento:'1995-09-09',idDepartamento:1, idSexo: 1, idTipoFuncionario:1, idFuncionario:1}
        this.pdfSrc = this.avance?.documento;
        //this.closeOnError();--------------------------------------------------------------------------------------
      }
    )
  }

  loadUser() {
    this.functionaryService.getById(this.avance?.funcionarioAplicativo).subscribe(
      res => {
        if (res['estado']) {
          this.funcionario_Aplicativo = res['avance']
        } else {
          this.closeOnError();
        }
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
      this.funcionario_Aplicativo = undefined;
    }, 500)
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