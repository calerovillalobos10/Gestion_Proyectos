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
        this.closeOnError();
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
    this.alertService.promiseAlert('Surgio un error al cargar el funcionario').then(
      () => {
        this.closeModal();
      }
    )
  }

}