import { FormGroup } from "@angular/forms";

export class ModalSkeleton{

  public formToggle: boolean;
  public openedModal: boolean;
  public form!: FormGroup;
  
  constructor(){
    this.formToggle = false
    this.openedModal = true
  }

  async closeModal() {
    this.formToggle = true;
    setTimeout(() => { this.openedModal = false }, 500)
    this.form.reset()
  }
  
}