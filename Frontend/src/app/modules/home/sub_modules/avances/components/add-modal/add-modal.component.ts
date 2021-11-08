import { SolicitudeService } from '@core/services/solicitude/solicitude.service';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { AdvancesService } from '@core/services/advances/advances.service';
import { ModalSkeleton } from '@core/others/ModalSkeleton';

import { AlertService } from '@core/services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})

export class AddModalComponent extends ModalSkeleton implements OnInit {

  public pdfSrc = ''

  public aplicativo: any;
  public solicitudes: any;
  private selectedSolicitude: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: AdvancesService,
    private serviceFunctionary: FuncionariosService,
    private serviceSolicitude: SolicitudeService,
    private alertService: AlertService,
  ) {
    super();
    this.pdfSrc = '';

    this.loadSolicitude();
    this.loadFunctionaries();
    this.buildForm();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.pdfSrc = '';
        this.openedModal = data.status
        this.formToggle = !data.status
      }
      
    })
  }

  add_solicitude() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.service.create(this.obtainAdvance()).subscribe(
      res => {
        if(res['estado']){
          this.closeModal();
          this.alertService.promiseAlert('Se agregó correctamente el el avance').then(() => {
            this.service.updateNeeded.emit(true)
          })
        }else{
          this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
        }
      },
      err => {
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      }
      )
    }

      // Extrae los datos de un avance valido a un objeto FormData
  obtainAdvance(): FormData {
    const postData = new FormData();

    postData.append('aplicativo', this.form.value.aplicativo);
    postData.append('trimestre', this.form.value.trimestre);
    postData.append('solicitud', this.form.value.solicitud);
    postData.append('fechaAvance', this.form.value.fechaAvance);
    postData.append('documento', this.form.value.documento);
  
    return postData;
  }

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.loadPreview(event);
      this.form.patchValue({ documento: event.target.files[0] })
    } else {
      this.form.patchValue({ documento: '' })
      this.pdfSrc = '';
    }
  }

  loadPreview(event: any) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onloadend = (e: any) => {
      this.pdfSrc = e.target.result;
    };
  }
  // Extrae los datos de un funcionario valido a un objeto funcionario
  obtainSolicitude(): FormData {
    const postData = new FormData();

    postData.append('idTrimestre', this.form.value.trimestre);
    postData.append('idFuncionario_Aplicativo', this.form.value.aplicativo);
    postData.append('idSolicitud', this.form.value.solicitud);
    postData.append('fechaAvance', this.form.value.fechaAvance);
    postData.append('documento', this.form.value.documento);

    return postData;
  }

  // Metodo para construir el formulario con validaciones
  buildForm() {
    this.form = this.formBuilder.group({

      aplicativo: ["", [
        Validators.required,
      ]],

      trimestre: ["",
        [Validators.required
        ]],

      solicitud: ["",
        [Validators.required
        ]],

      fechaAvance: [{ value: '', disabled: true },
      [Validators.required
      ]],

      documento: ["",],

      urlDocumento: ["",
        [Validators.required,
        Validators.pattern('^(.)*.(pdf)$')
        ]],
    })
  }

  validateSolicitude(event:any){
    this.selectedSolicitude = this.solicitudes.filter((element:any)=> element.idSolicitud == event.target.value);

    this.form.patchValue({
      fechaAvance: '',
    })

    if(this.selectedSolicitude){
      this.selectedSolicitude = this.selectedSolicitude[0];
      this.form.get('fechaAvance')?.enable()
    }else{
      this.form.get('fechaAvance')?.disable()
    }
   
  }

  validateDate(){
    if(this.isBefore(this.selectedSolicitude.fechaInicio, this.form.value.fechaAvance)){
      return this.form.controls['fechaAvance'].setErrors({'incorrectDateInit': true});
    }else{
      this.form.controls['fechaAvance'].setErrors(null);
    }

    if(this.isBefore(this.form.value.fechaAvance, this.selectedSolicitude.fechaFin )){
      return this.form.controls['fechaAvance'].setErrors({'incorrectDateEnd': true});
    }else{
      this.form.controls['fechaAvance'].setErrors(null);
    }
  }
  
  // Carga el array de solicitudes
  loadSolicitude() {
    this.serviceSolicitude.getAll().subscribe(

      res => {
        this.solicitudes = res['estado'] ? res['list'] : [];
      },

      err => {
        this.solicitudes = [{ idSolicitud: '1', funcionarioResponsable: 'Luis', fechaInicio:'2021-11-11', fechaFin:'2021-11-14' }];// [];
      }
    )
  }

  // Este metodo valida su una fecha esta antes que otra.
  isBefore(start: Date, end: Date){
    return start > end
  }

  // Carga los funcionarios al Array
  loadFunctionaries() {
    this.serviceFunctionary.getAll().subscribe(

      (res) => {
        if (res['estado']) {
          this.aplicativo = this.serviceFunctionary.filterFunctionary(res['list'], 1);
        } else {
          this.aplicativo = [];
        }
      },
      (err) => {
        this.aplicativo = [{ idFuncionario: '1', nombre: 'Luis' }];// [];
      }
    )
  }


}