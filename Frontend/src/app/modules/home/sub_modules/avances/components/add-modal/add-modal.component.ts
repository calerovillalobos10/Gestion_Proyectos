import { MAX_FILE } from '@core/others/Enviroment';
import { Avance } from '@core/models/Avance';
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

  public allowedSize: number;
  public aplicativo: any;
  public solicitudes: any;
  private selectedSolicitude: any;

  private oldDocument: string;
  private idAdvance: number;

  public modalType: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: AdvancesService,
    private serviceFunctionary: FuncionariosService,
    private serviceSolicitude: SolicitudeService,
    private alertService: AlertService,
  ) {
    super();
    this.pdfSrc = '';

    this.modalType = 'registro';

    this.allowedSize = MAX_FILE;
    this.oldDocument = '';
    this.idAdvance = -1;

    this.loadSolicitude();
    this.loadFunctionaries();
    this.buildForm();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'addModal') {
        this.pdfSrc = '';
        this.modalType = 'registro'
        this.openedModal = data.status
        this.formToggle = !data.status
      }

      if (data.subject === 'edtModal') {
        this.modalType = 'edicion'
        this.loadEditModal(data.advanceId);
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
      this.createAdvance();
    } else {
      this.updateAdvance();
    }
  }

  createAdvance() {
    this.service.create(this.obtainAdvance()).subscribe(
      res => {
        if (res['estado']) {
          this.closeAndEraseModal();
          this.alertService.promiseAlert('Se agregó correctamente el el avance').then(() => {
            this.service.updateNeeded.emit(true)
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

  updateAdvance() {
    this.service.update(this.obtainAdvance()).subscribe(
      res => {
        if (res['estado']) {
          this.closeAndEraseModal();
          this.alertService.promiseAlert('Se modificó correctamente el el avance').then(() => {
            this.service.updateNeeded.emit(true)
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

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {

    // Si hay un archivo en el evento
    if (event.target.files && event.target.files[0]) {
      const size = (event.target.files[0].size / 1048576)

      // Si el archivo supera el limite
      if (size > MAX_FILE) {
        this.form.patchValue({ documento: '' })
        this.pdfSrc = '';
        this.form.get('urlDocumento')?.setErrors({ 'sizeError': true })
      } else {
        this.form.get('urlDocumento')?.setErrors(null)
      }

      // Si no existen errores
      if (!this.form.get('urlDocumento')?.errors) {
        this.loadPreview(event);
        this.form.patchValue({ documento: event.target.files[0] })
        this.form.patchValue({ urlDocumento: event.target.files[0].name })
      }
    } else {
      this.form.patchValue({ documento: '' })
      if (this.modalType == 'edicion') {
        this.form.patchValue({ urlDocumento: this.oldDocument })
        this.pdfSrc = this.oldDocument;
      } else {
        this.form.patchValue({ urlDocumento: '' })
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
    this.form.patchValue({ documento: '' })

    if (this.modalType == 'edicion') {
      this.form.patchValue({ urlDocumento: this.oldDocument })
      this.pdfSrc = this.oldDocument;
    } else {
      this.form.patchValue({ urlDocumento: '' })
      this.pdfSrc = ' ';
    }

  }

  // Extrae los datos de un funcionario valido a un objeto funcionario
  obtainAdvance(): FormData {
    const postData = new FormData();

    postData.append('idAvance', this.idAdvance + '');
    postData.append('idTrimestre', this.form.value.trimestre);
    postData.append('idFuncionario_Aplicativo', this.form.value.aplicativo);
    postData.append('idSolicitud', this.form.value.solicitud);
    postData.append('fechaAvance', this.form.value.fechaAvance);
    postData.append('documento', this.form.value.documento);

    if (this.modalType == 'edicion') {
      // Validacion, si cambia la foto sube el file, sino solo pasa url viejo.
      if (this.oldDocument == this.form.value.urlDocumento) {
        postData.append('documento', this.oldDocument);
      } else {
        postData.append('documento', this.form.value.documento);
      }
    }else{  
      postData.append('documento', this.form.value.documento);
    }

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

  validateSolicitude(event: any) {
    this.selectedSolicitude = this.solicitudes.filter((element: any) => element.idSolicitud == event.target.value);

    this.form.patchValue({
      fechaAvance: '',
    })

    if (this.selectedSolicitude) {
      this.selectedSolicitude = this.selectedSolicitude[0];
      this.form.get('fechaAvance')?.enable()
    } else {
      this.form.get('fechaAvance')?.disable()
    }

  }

  validateDate() {
    if (this.isBefore(this.selectedSolicitude.fechaInicio, this.form.value.fechaAvance)) {
      return this.form.controls['fechaAvance'].setErrors({ 'incorrectDateInit': true });
    } else {
      this.form.controls['fechaAvance'].setErrors(null);
    }

    if (this.isBefore(this.form.value.fechaAvance, this.selectedSolicitude.fechaFin)) {
      return this.form.controls['fechaAvance'].setErrors({ 'incorrectDateEnd': true });
    } else {
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
        this.solicitudes = [{ idSolicitud: '1', funcionarioResponsable: 'Luis', fechaInicio: '2021-11-11', fechaFin: '2021-11-14' }];// [];
      }
    )
  }

  // Este metodo valida su una fecha esta antes que otra.
  isBefore(start: Date, end: Date) {
    return start > end
  }

  // Carga los funcionarios al Array
  loadFunctionaries() {
    this.serviceFunctionary.getAll().subscribe(

      (res) => {
        if (res['estado']) {
          this.aplicativo = this.serviceFunctionary.filterFunctionary(res['list'], 'Aplicativo');
        } else {
          this.aplicativo = [];
        }
      },
      (err) => {
        this.aplicativo = [{ idFuncionario: '1', nombre: 'Luis' }];// [];
      }
    )
  }

  // Metodo para cargar modal para edicion 
  loadEditModal(id: number) {
    this.service.getById(id).subscribe(
      (res) => {

        if (res['estado']) {
          this.patchData(res['avance'], id);
        } else {
          this.onErrorClose();
        }

      }, (err => {
        //this.onErrorClose();----------------------------------------------
        this.patchData(
          {
            funcionarioAplicativo: 1,
            trimestre: 3,
            fechaAvance: '2020-01-03',
            solicitud: 1,
            documento: "../../../assets/book/book.pdf"
          },
          id);
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
  patchData(advance: Avance, id: number) {

    this.oldDocument = advance.documento;
    this.idAdvance = id;

    this.form.patchValue({
      aplicativo: advance.funcionarioAplicativo,
      trimestre: advance.trimestre,
      fechaAvance: advance.fechaAvance,
      solicitud: advance.solicitud,
      urlDocumento: this.oldDocument
    })
    this.form.controls['fechaAvance'].enable();
    this.pdfSrc = this.oldDocument;
  }

  closeAndEraseModal() {
    this.pdfSrc = '';
    this.oldDocument = '';
    this.idAdvance = -1;
    this.closeModal();
  }

}