import { Funcionario } from '@core/models/Funcionario';
import { MAX_FILE } from '@core/others/Enviroment';
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
    postData.append('aplicativo', this.form.value.aplicativo);
    postData.append('responsable', this.form.value.responsable);
    postData.append('final', this.form.value.final);
    postData.append('fechaInicio', this.form.value.fechaInicio);
    postData.append('fechaFin', this.form.value.fechaFin);
    postData.append('fechaSolicitud', this.form.value.fechaSolicitud);

    if (this.modalType == 'edicion') {
      // Validacion, si cambia la foto sube el file, sino solo pasa url viejo.
      if (this.oldDocument == this.form.value.urlActa) {
        postData.append('documento', this.oldDocument);
        console.log(this.oldDocument)
      } else {
        postData.append('documento', this.form.value.acta);
       
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
        
        
        console.log(this.serviceFunctionary.filterFunctionary(fixedRows, 1));
        

        this.aplicativo = this.serviceFunctionary.filterFunctionary(fixedRows, 1);// [];
        this.responsable = this.serviceFunctionary.filterFunctionary(fixedRows, 2);// [];
        this.final = this.serviceFunctionary.filterFunctionary(fixedRows, 3);;// [];
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

  closeAndEraseModal() {
    this.pdfSrc = '';
    this.oldDocument = '';
    this.idSolicitude = -1;
    this.closeModal();
  }

}


const fixedRows:Array<Funcionario> = [
  { nombre: 'Luis', apellido_1: 'Leiton', apellido_2: 'Iglesias', urlFoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Terry_Crews_by_Gage_Skidmore_5.jpg/250px-Terry_Crews_by_Gage_Skidmore_5.jpg', correo: 'Luis@gmail', 
    fechaNacimiento: '1995-09-09', idDepartamento: 4, idSexo: 1, idTipoFuncionario: 1, idFuncionario: 1 },
  
  { nombre: 'Fernando', apellido_1: 'Alvarez', apellido_2: 'Salas', urlFoto: 'https://miracomosehace.com/wp-content/uploads/2020/05/hombre-gorra-camara-1.jpg', correo: 'Fernando@gmail.com',
  fechaNacimiento: '1999-09-09', idDepartamento: 2, idSexo: 1, idTipoFuncionario: 2, idFuncionario: 2 },

  { nombre: 'Ana', apellido_1: 'Soto', apellido_2: 'Salas', urlFoto: 'https://www.dzoom.org.es/wp-content/uploads/2010/09/retrato-fondo-profundidad-campo-734x489.jpg', correo: 'ana@gmail', 
  fechaNacimiento: '1989-09-09', idDepartamento: 2, idSexo: 2, idTipoFuncionario: 3, idFuncionario: 3 }
]