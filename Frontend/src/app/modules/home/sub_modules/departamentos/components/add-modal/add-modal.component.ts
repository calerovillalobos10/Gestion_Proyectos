import { DepartamentosService } from './../../../../../../core/services/Departamentos/departamentos.service';
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
    private service: DepartamentosService
  ) { 
    this.formToggle = false
    this.openedModal = false

    this.form = this.formBuilder.group({
      descripcion: ["",
        [
          Validators.required,
          Validators.maxLength(50)
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

  add_dept(){
   
  }

    // Metodo que destruye formulario y datos cargados al modal
    async closeModal() {
   
      this.formToggle = true;
      setTimeout(() => { this.openedModal = false }, 500)
      this.form.reset()
     
    }

}
