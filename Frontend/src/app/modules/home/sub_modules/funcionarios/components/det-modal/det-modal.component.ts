import { Funcionario } from '@core/models/Funcionario';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-det-modal',
  templateUrl: './det-modal.component.html',
  styleUrls: ['./det-modal.component.scss']
})
export class DetModalComponent implements OnInit {

  public formToggle:boolean;
  public userId:number;
  public openedModal:boolean;
  public funcionario:Funcionario | undefined

  constructor(
    private service:FuncionariosService
  ) {
    this.userId = 0;
    this.formToggle = false
    this.openedModal = false
   }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data =>{
      if(data.subject === 'detModal'){
        this.openedModal = data.status
        this.formToggle = !data.status
        this.userId = data.userId; // Obtener este usuario y mostrarlo
        this.loadUser();
      }
    })
  }

  async loadUser(){
    

     //const userData: Funcionario = await this.service.getById(this.userId); --------------------------------------- Al tener el back ----------------------

    const userData: Funcionario =
    {
      correo: 'Luis@gmail.com', idTipoFuncionario: '1', idDepartamento: '2', nombre: 'Luis', apellido1: "apellido1",
      apellido2: "apellido2", fechaNacimiento: '18/09/1995', idSexo: '1', urlFoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHuc8zYUjuM2C66ip1xdDpS2qMa2yYnN5TbQ&usqp=CAU'
    }

    this.funcionario = userData;
  }

  async closeModal() {
    
    this.formToggle = true;
    setTimeout(()=>{
      this.openedModal = false
      this.funcionario = undefined;
    }, 500)
  }

}