import { AdvancesService } from './../../../../../../core/services/advances/advances.service';
import { Solicitud } from '@core/models/Solicitud';
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
    this.pdfSrc = '';

    this.modalType = 'registro';
    this.oldDocument = '';
    this.idSolicitude = -1;

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
        this.loadEditModal(data.id);
        this.openedModal = data.status
        this.formToggle = !data.status
      }
    })
  }

  add_solicitude() {
    console.log(this.form.value.urlActa)
    console.log(this.form.value.acta)
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
      if (size > 1.25) {
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

  
  resetDocument(){
    this.form.patchValue({ acta: '' })

    if (this.modalType == 'edicion') {
      this.form.patchValue({ urlActa: this.oldDocument })
      this.pdfSrc = this.oldDocument;
    }else {
      this.form.patchValue({ urlActa: '' })
      this.pdfSrc = ' ';
    }
    
  }

  // Extrae los datos de una solicitud valido a un objeto FormData
  obtainSolicitude(): FormData {
    const postData = new FormData();

    postData.append('idSolicitud', this.idSolicitude + '');
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
        Validators.pattern('^(.)*.(pdf)$')
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
          this.aplicativo = this.serviceFunctionary.filterFunctionary(res['lista'], 1);
          this.responsable = this.serviceFunctionary.filterFunctionary(res['lista'], 2);
          this.final = this.serviceFunctionary.filterFunctionary(res['lista'], 3);
        } else {
          this.aplicativo = [];
          this.responsable = [];
          this.final = [];
        }
      },
      (err) => {
        this.aplicativo = [{ idFuncionario: '1', nombre: 'Luis' }];// [];
        this.responsable = [{ idFuncionario: '2', nombre: 'Fernando' }];// [];
        this.final = [{ idFuncionario: '3', nombre: 'Leiton' }];// [];
      }
    )
  }

  // Metodo para cargar modal para edicion 
  loadEditModal(id: number) {
    this.service.getById(id).subscribe(
      (res) => {

        if (res['estado']) {
          this.patchData(res['solicitud'], id);
        } else {
          this.onErrorClose();
        }

      }, (err => {
        //this.onErrorClose();----------------------------------------------
        this.patchData(
          {
            funcionarioAplicativo: 1,
            funcionarioFinal: 3,
            funcionarioResponsable: 2,
            fechaInicio: '2020-01-03',
            fechaFin: '2020-01-05',
            fechaSolicitud: "2020-01-02",
            documentoActa: "../../../assets/book/book.pdf"
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
  patchData(solicitude: Solicitud, id: number) {
    this.oldDocument = solicitude.documentoActa;
    this.idSolicitude = id;

    this.form.patchValue({
      aplicativo: solicitude.funcionarioAplicativo,
      responsable: solicitude.funcionarioResponsable,
      final: solicitude.funcionarioFinal,
      fechaInicio: solicitude.fechaInicio,
      fechaFin: solicitude.fechaFin,
      fechaSolicitud: solicitude.fechaSolicitud,
      urlActa: this.oldDocument
    })
    this.form.controls['fechaInicio'].enable();
    this.form.controls['fechaFin'].enable();
    this.pdfSrc = this.oldDocument;
  }

  closeAndEraseModal(){
    this.pdfSrc = '';
    this.oldDocument = '';
    this.idSolicitude = -1;
    this.closeModal();
  }

}