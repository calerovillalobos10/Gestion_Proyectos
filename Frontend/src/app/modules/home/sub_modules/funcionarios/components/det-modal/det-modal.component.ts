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
  public urlFoto: any;

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
          console.log(res['functionary']);

          this.funcionario = res['functionary']
          this.loadUrlFoto(res['functionary'].urlFoto);

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

  loadUrlFoto(urlFoto:string){
    this.service.obtainUrlImage(urlFoto).subscribe(res => {
     let reader = new FileReader();
     reader.readAsDataURL(res); 
     reader.onloadend = () => { this.urlFoto = reader.result }
    })
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

const fixedRows:Array<Funcionario> = [
  { nombre: 'Luis', apellido_1: 'Leiton', apellido_2: 'Iglesias', urlFoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Terry_Crews_by_Gage_Skidmore_5.jpg/250px-Terry_Crews_by_Gage_Skidmore_5.jpg', correo: 'Luis@gmail', 
    fechaNacimiento: '1995-09-09', idDepartamento: 4, idSexo: 1, idTipoFuncionario: 1, idFuncionario: 1 },
  
  { nombre: 'Fernando', apellido_1: 'Alvarez', apellido_2: 'Salas', urlFoto: 'https://miracomosehace.com/wp-content/uploads/2020/05/hombre-gorra-camara-1.jpg', correo: 'Fernando@gmail.com',
  fechaNacimiento: '1999-09-09', idDepartamento: 2, idSexo: 1, idTipoFuncionario: 2, idFuncionario: 2 },

  { nombre: 'Ana', apellido_1: 'Soto', apellido_2: 'Salas', urlFoto: 'https://www.dzoom.org.es/wp-content/uploads/2010/09/retrato-fondo-profundidad-campo-734x489.jpg', correo: 'ana@gmail', 
  fechaNacimiento: '1989-09-09', idDepartamento: 2, idSexo: 2, idTipoFuncionario: 3, idFuncionario: 3 }
]