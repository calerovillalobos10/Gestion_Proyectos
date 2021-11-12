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

  public formToggle: boolean;
  public openedModal: boolean;
  public userId: number;
  public funcionario: Funcionario | undefined

  constructor(
    private service: FuncionariosService,
    private alertService: AlertService
  ) {
    this.userId = 0;
    this.formToggle = false
    this.openedModal = false
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'detModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
        this.userId = data.userId; // Obtener este usuario y mostrarlo
        this.loadUser();
      }
    })
  }

  async loadUser() {
    this.service.getById(this.userId).subscribe(
      res => {
        if (res['estado']) {
          this.funcionario = res['funcionario']
        } else {
          this.closeOnError();
        }
      },
      err => {
        //this.closeOnError();
        this.funcionario = {
          nombre: 'Luis', apellido_1: 'Leiton', apellido_2: 'Iglesias', correo: 'Luis@gmail', fechaNacimiento: '1995-09-09', idDepartamento: 1, idSexo: 1, idTipoFuncionario: 1, idFuncionario: 1,
          urlFoto: 'https://www.explica.me/__export/1635367942684/sites/debate/img/2021/10/27/lightyearx_2022_llega_la_nueva_pelxcula_de_pixar_sobre_el_origen_de_buzz_lightyear.png_172596871.png'
        }
      }
    )
  }

  async closeModal() {
    this.formToggle = true;
    setTimeout(() => {
      this.openedModal = false
      this.funcionario = undefined;
    }, 500)
  }

  // Este metodo cierra el modal mostrando una alerta de error.
  closeOnError() {
    this.alertService.promiseAlertError('Surgio un error al cargar el funcionario').then(
      () => {
        this.closeModal();
      }
    )
  }
}