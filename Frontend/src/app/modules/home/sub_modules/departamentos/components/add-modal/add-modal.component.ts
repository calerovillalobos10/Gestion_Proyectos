import { Departamento } from '@core/models/Departamento';
import { AlertService } from '@core/services/alert/alert.service';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  public form!: FormGroup;
  public formToggle: boolean;
  public openedModal: boolean;
  
  
  constructor(
    private formBuilder:FormBuilder,
    private service: DepartamentosService,
    private alertService: AlertService
  ) { 
    this.formToggle = false
    this.openedModal = false
    

    this.form = this.formBuilder.group({
      descripcion: ["",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]]
      })
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.openedModal = data.status
        this.formToggle = !data.status
      }
    })
  }

  // Envia los datos de la agregacion del departamento
  add_dept() {
    this.form.markAllAsTouched();
    if(this.form.valid){
      
      // Espera la respuesta del backend.
      if(this.service.create({descripcion:this.form.value.descripcion})){  //-------------------------------Al tener el back-----------
          this.closeModal();  
          this.alertService.promiseAlert('Se agregó correctamente el departamento').then(()=>{
          this.service.updateNeeded.emit(true)
        })
      }else{
        // Si el backend envia una respuesta incorrecta.
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      }
    }
  }

    // Metodo que destruye formulario y datos cargados al modal
    async closeModal() {
      this.formToggle = true;
      setTimeout(() => { this.openedModal = false }, 500)
      this.form.reset();
    }

    
}

