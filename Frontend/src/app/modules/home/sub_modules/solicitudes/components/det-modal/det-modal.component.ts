import { SolicitudeService } from '@core/services/solicitude/solicitude.service';
import { Solicitud } from '@core/models/Solicitud';
import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-det-modal',
  templateUrl: './det-modal.component.html',
  styleUrls: ['./det-modal.component.scss']
})
export class DetModalComponent implements OnInit {

  public solicitud: Solicitud | undefined;

  public funcionario_Aplicativo: Funcionario | undefined
  public funcionario_Responsable: Funcionario | undefined
  public funcionario_Final: Funcionario | undefined

  public pdfSrc: String;
  public formToggle: boolean;
  public openedModal: boolean;
  public solicitudId: number;

  constructor(
    private service: SolicitudeService,
    private functionaryService: FuncionariosService,
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
    this.service.getById(this.solicitudId).subscribe(
      res => {
        if (res['estado']) {
          this.solicitud = res['avance']
          this.pdfSrc = this.solicitud?.documentoActa;

          this.loadUser();
        } else {
          this.closeOnError();
        }
      },
      err => {
        this.solicitud = { fechaInicio: "2020-02-01", fechaFin: "2020-05-05", fechaSolicitud: "2020-01-01", funcionarioAplicativo: 'Luis A', funcionarioResponsable: 'Luis B', funcionarioFinal: 'Luis C', idSolicitud: 1, documentoActa: '../../../assets/book/book.pdf' }
        this.funcionario_Aplicativo = {nombre: 'Luis', apellido_1: 'Leiton', apellido_2:'Iglesias', urlFoto:'', correo: 'Luis@gmail', fechaNacimiento:'1995-09-09',idDepartamento:1, idSexo: 1, idTipoFuncionario:1, idFuncionario:1}
        this.funcionario_Responsable = {nombre: 'Luis', apellido_1: 'Leiton', apellido_2:'Iglesias', urlFoto:'', correo: 'Luis@gmail', fechaNacimiento:'1995-09-09',idDepartamento:1, idSexo: 1, idTipoFuncionario:1, idFuncionario:1}
        this.funcionario_Final = {nombre: 'Luis', apellido_1: 'Leiton', apellido_2:'Iglesias', urlFoto:'', correo: 'Luis@gmail', fechaNacimiento:'1995-09-09',idDepartamento:1, idSexo: 1, idTipoFuncionario:1, idFuncionario:1}
        
        this.pdfSrc = this.solicitud?.documentoActa;
        //this.closeOnError();--------------------------------------------------------------------------------------
      }
    )
  }

  loadUser() {
    this.functionaryService.getById(this.solicitud?.funcionarioAplicativo).subscribe(
      res => {
        if (res['estado']) {
          this.funcionario_Aplicativo = res['funcionario']
        } else {
          this.closeOnError();
        }
      },
      err => {
        this.closeOnError();
      }
    )

    this.functionaryService.getById(this.solicitud?.funcionarioFinal).subscribe(
      res => {
        if (res['estado']) {
          this.funcionario_Final = res['funcionario']
        } else {
          this.closeOnError();
        }
      },
      err => {
        this.closeOnError();
      }
    )

    this.functionaryService.getById(this.solicitud?.funcionarioResponsable).subscribe(
      res => {
        if (res['estado']) {
          this.funcionario_Responsable = res['funcionario']
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

  relatedAdvances(id:any){
    this.service.modalNeeded.emit({ subject: 'relModal', status: true, solicitudId: this.solicitudId});
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