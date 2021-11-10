import { FormGroup } from "@angular/forms";

/*
  Componentes compartidos de los modales de la aplicacion.
*/
export class ModalSkeleton{

  public formToggle: boolean;
  public openedModal: boolean;
  public form!: FormGroup;
  
  constructor(){
    this.formToggle = false
    this.openedModal = false
  }

  async closeModal() {
    this.formToggle = true;
    setTimeout(() =>  this.openedModal = false , 500)
    if(this.form){
      this.form.reset()
    }
  }
  
}