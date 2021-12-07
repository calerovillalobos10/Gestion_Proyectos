
import { MAX_FILE } from '@core/others/Enviroment';

import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { SolicitudeService } from '@core/services/solicitude/solicitude.service';
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
  public allowedSize;
  public aplicativo: any;
  public final: any;
  public responsable: any;

  private oldDocument: string;
  private idSolicitude: number;

  public modalType: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: SolicitudeService,
    private alertService: AlertService,
    private serviceFunctionary: FuncionariosService,
  ) {
    super();

    this.modalType = 'registro';
    this.pdfSrc = '';
    this.oldDocument = '';
    this.idSolicitude = -1;
    this.allowedSize = MAX_FILE; // Tamaño permitido para los archivos

    this.loadFunctionaries()
    this.buildForm();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.modalType = 'registro'
        this.pdfSrc = '';
        this.openedModal = data.status
        this.formToggle = !data.status
      }

      if (data.subject === 'edtModal') {
        this.modalType = 'edicion'
        this.loadEditModal(data.solicitudeId);
        this.openedModal = data.status
        this.formToggle = !data.status
      }
    })
  }

  add_solicitude() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    if (this.modalType == 'registro') {
      this.createSolicitude();
    } else {
      this.updateSolicitude();
    }
  }

  createSolicitude() {
    this.service.create(this.obtainSolicitude()).subscribe(
      res => {
        if (res['estado']) {
          this.closeAndEraseModal();
          this.alertService.promiseAlert('Se agregó correctamente la solicitud').then(() => {
            this.service.updateNeeded.emit(true)
            this.oldDocument = '';
            this.idSolicitude = -1;
          })
        } else {
          this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
        }
      },
      err => {
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      }
    )
  }

  updateSolicitude() {
    this.service.update(this.obtainSolicitude()).subscribe(
      res => {
        if (res['estado']) {
          this.closeAndEraseModal();
          this.alertService.promiseAlert('Se modificó correctamente la solicitud').then(() => {
            this.service.updateNeeded.emit(true)
            this.oldDocument = '';
            this.idSolicitude = -1;
          })
        } else {
          alert('123')
          this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
        }
      },
      err => {
        alert('321')
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      }
    )
  }

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {

    // Si hay un archivo en el evento
    if (event.target.files && event.target.files[0]) {
      const size = (event.target.files[0].size / 1048576)

      // Si el archivo supera el limite
      if (size > MAX_FILE) {
        this.form.patchValue({ acta: '' })
        this.pdfSrc = '';
        this.form.get('urlActa')?.setErrors({ 'sizeError': true })
      } else {
        this.form.get('urlActa')?.setErrors(null)
      }

      // Si no existen errores
      if (!this.form.get('urlActa')?.errors) {
        this.loadPreview(event);
        this.form.patchValue({ acta: event.target.files[0] })
        this.form.patchValue({ urlActa: event.target.files[0].name })
      }
    } else {
      this.form.patchValue({ acta: '' })
      if (this.modalType == 'edicion') {
        this.form.patchValue({ urlActa: this.oldDocument })
        this.pdfSrc = this.oldDocument;
      } else {
        this.form.patchValue({ urlActa: '' })
        this.pdfSrc = '';
      }
    }
  }

  loadPreview(event: any) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onloadend = (e: any) => {
      this.pdfSrc = e.target.result;
    };
  }

  resetDocument() {
    this.form.patchValue({ acta: '' })

    if (this.modalType == 'edicion') {
      this.form.patchValue({ urlActa: this.oldDocument })
      this.pdfSrc = this.oldDocument;
    } else {
      this.form.patchValue({ urlActa: '' })
      this.pdfSrc = ' ';
    }
  }

  // Extrae los datos de una solicitud valido a un objeto FormData
  obtainSolicitude(): FormData {
    const postData = new FormData();

    postData.append('idSolicitud', this.idSolicitude + '');
    postData.append('funcionarioAplicativo', this.form.value.aplicativo);
    postData.append('funcionarioResponsable', this.form.value.responsable);
    postData.append('funcionarioFinal', this.form.value.final);
    postData.append('fechaInicio', this.form.value.fechaInicio);
    postData.append('fechaFin', this.form.value.fechaFin);
    postData.append('fechaSolicitud', this.form.value.fechaSolicitud);

    if (this.modalType == 'edicion') {
      // Validacion, si cambia la foto sube el file, sino solo pasa url viejo.
      if (this.oldDocument == this.form.value.urlActa) {
        postData.append('documentoActaConst', this.oldDocument);
        
      } else {
        postData.append('documentoActaConst', this.form.value.acta);
       
      }
    }else{  
      postData.append('documento', this.form.value.acta);
    }
  
    
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
      fechaInicio: [
        { value: "", disabled: true },
        [Validators.required
        ]],
      fechaFin: [
        { value: "", disabled: true },
        [Validators.required
        ]],
      fechaSolicitud: ["",
        [Validators.required
        ]],
      acta: ["",
      ],
      urlActa: ["",
        [Validators.required,
       // Validators.pattern('^(.)*.(pdf)$')
        ]],
    })
  }

  // Validaciones para la fecha de solicitud.
  // Desactiva la fecha inicial y la final.
  validateSolcitudeDate() {
    let primal = new Date('01-01-2021');

    this.form.patchValue({
      fechaInicio: '',
      fechaFin: '',
    })

    if (this.form.value.fechaSolicitud !== '' && new Date(this.form.value.fechaSolicitud) > primal) {
      this.form.controls['fechaSolicitud'].setErrors(null);
      this.form.controls['fechaInicio'].enable();
    } else {
      this.form.controls['fechaSolicitud'].setErrors({ 'incorrectDate': true });
      this.form.controls['fechaInicio'].disable();
    }
    this.form.controls['fechaFin'].disable();
  }

  // Validaciones para la fecha inicial.
  // Desactiva la fecha final.
  validateInitDate() {
    this.form.patchValue({
      fechaFin: '',
    })

    if (this.form.value.fechaSolicitud !== '' && this.isBefore(this.form.value.fechaInicio, this.form.value.fechaSolicitud)) {
      this.form.controls['fechaInicio'].setErrors(null);
      this.form.controls['fechaFin'].enable();
    } else {
      this.form.controls['fechaInicio'].setErrors({ 'incorrectDate': true });
      this.form.controls['fechaFin'].disable();
    }
  }

  // Validaciones para la fecha final
  validateEndDate() {
    if (this.isBefore(this.form.value.fechaInicio, this.form.value.fechaFin)) {
      this.form.controls['fechaFin'].setErrors({ 'incorrectDate': true });
    } else {
      this.form.controls['fechaFin'].setErrors(null);
    }
  }
  // Este metodo valida su una fecha esta antes que otra.
  isBefore(start: Date, end: Date) {
    return start > end
  }

  // Metodo para cargar los funcionario a el modal 
  loadFunctionaries() {
    this.serviceFunctionary.getAll().subscribe(

      (res) => {
        if (res['estado']) {
          this.aplicativo = this.serviceFunctionary.filterFunctionary(res['list'], 'Aplicativo');
          this.responsable = this.serviceFunctionary.filterFunctionary(res['list'], 'Responsable');
          this.final = this.serviceFunctionary.filterFunctionary(res['list'], 'Final');
        } else {
          this.aplicativo = [];
          this.responsable = [];
          this.final = [];
        }
      },
      (err) => {
        this.aplicativo = [];
        this.responsable = [];
        this.final = [];
      }
    )
  }

  // Metodo para cargar modal para edicion 
  loadEditModal(id: number) {

    this.service.getById(id).subscribe(
      (res) => {
        console.log(res);
        
        if (res['estado']) {
          
          this.patchData(res['solicitation'], id);
        } else {
          this.onErrorClose();
        }

      }, (err => {
        this.onErrorClose();
      }
    ))
  }

  // Metodo de cierre en form debido a error
  onErrorClose() {
    this.alertService.promiseAlert('Surgio un error al cargar la solicitud').then(() => {
      this.closeAndEraseModal();
    })
  }

  // Este metodo coloca los datos a editar en el formulario
  patchData(solicitude: any, id: number) {
    this.oldDocument = solicitude.documentoActaConst;
    this.idSolicitude = id;

    this.form.patchValue({
      aplicativo: solicitude.funcionarioAplicativo,
      responsable: solicitude.funcionarioResponsable,
      final: solicitude.funcionarioFinal,
      fechaInicio: solicitude.fechaIncio.substring(0,10),
      fechaFin: solicitude.fechaFin.substring(0,10),
      fechaSolicitud: solicitude.fechaSolicitud.substring(0,10),
      urlActa: this.oldDocument
    })
    this.form.controls['fechaInicio'].enable();
    this.form.controls['fechaFin'].enable();
    this.pdfSrc = this.oldDocument;
  }

  closeAndEraseModal() {
    this.pdfSrc = '';
    this.oldDocument = '';
    this.idSolicitude = -1;
    this.closeModal();
  }

}