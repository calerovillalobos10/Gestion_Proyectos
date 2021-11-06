import { ModalSkeleton } from '@core/others/ModalSkeleton';

import { AlertService } from '@core/services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})

export class AddModalComponent extends ModalSkeleton implements OnInit {
 
  public pdfSrc = ''
  
  public preview: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService,
  ) {
    super();
    this.preview = '';
    this.buildForm();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.preview = '';
        this.openedModal = data.status
        this.formToggle = !data.status
      }
    })
  }

  add_solicitude() {

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

   
    if (this.service.create(this.obtainSolicitude())) { //-----------------------------------------------------Al tener el back -----------
      this.closeModal();
      this.alertService.promiseAlert('Se agregó correctamente el funcionario').then(() => {
        this.service.updateNeeded.emit(true)
      })
    } else {
      // Si el backend envia una respuesta incorrecta.
      this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
    }
  }

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {
    
    if (event.target.files && event.target.files[0]) {
      this.loadPreview(event);
      this.form.patchValue({ acta: event.target.files[0] })
    } else {
      this.form.patchValue({ acta: '' })
      this.preview = '';
    }
  }

  loadPreview(event: any) {

    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      this.pdfSrc = e.target.result;
    };
    this.form.patchValue({urlActa: event.target.files[0].name})
    reader.readAsArrayBuffer(event.target.files[0]);

  }

  // Extrae los datos de un funcionario valido a un objeto funcionario
  obtainSolicitude(): FormData {
    const postData = new FormData();

    postData.append('aplicativo', this.form.value.aplicativo);
    postData.append('responsable', this.form.value.responsable);
    postData.append('final', this.form.value.final);
    postData.append('fechaInicio', this.form.value.fechaInicio);
    postData.append('fechaFin', this.form.value.fechaFin);
    postData.append('fechaSolicitud', this.form.value.fechaSolicitud);
    postData.append('acta', this.form.value.acta);
  
    return postData;
  }

  // Metodo para construir el formulario con validaciones
  buildForm() {
    this.form = this.formBuilder.group({
 
      aplicativo: ["", [
        Validators.required,
      ]],
      responsable: ["", [
        Validators.required,
      ]],
      final: ["", [
        Validators.required,
      ]],
      fechaInicio: ["", 
      [Validators.required
      ]],
      fechaFin: ["", 
      [Validators.required
      ]],
      fechaSolicitud: ["", 
      [Validators.required
      ]],
      acta: ["", 
      ],
      urlActa: ["", 
      [Validators.required,
       Validators.pattern('^(.)*.(pdf)$')
      ]],
    })
  }
}