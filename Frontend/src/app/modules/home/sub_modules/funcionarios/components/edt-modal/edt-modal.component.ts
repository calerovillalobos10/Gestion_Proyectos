import { MAX_PICTURE } from '@core/others/Enviroment';
import { ModalSkeleton } from '@core/others/ModalSkeleton';
import { Departamento } from '@core/models/Departamento';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { disable } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-edt-modal',
  templateUrl: './edt-modal.component.html',
  styleUrls: ['./edt-modal.component.scss']
})
export class EdtModalComponent extends ModalSkeleton implements OnInit {
  public allowedSize: number;
  private userId: number;
  public preview: string | ArrayBuffer | null | undefined;
  private oldPicture: string;
  private oldMail: string;

  public departamentos: Array<Departamento> = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService,
    private deptService: DepartamentosService
  ) {
    super();
    this.allowedSize = MAX_PICTURE;
    this.preview = '';
    this.userId = 0
    this.oldMail = '';
    this.oldPicture = '';

    this.deptService.getAll().subscribe(
      res => {
        this.departamentos = !res['estado'] ? [] : res['list'];
      },
      err => {
        this.departamentos = [];
      }
    )

    this.departamentos = [{ descripcion: 'TI', idDepartamento: 1 }, { descripcion: 'RRHH', idDepartamento: 2 }]
    this.buildForm();
  }

  ngOnInit(): void {
    this.service.modalNeeded.subscribe(data => {
      if (data.subject === 'editModal') {
        this.preview = '';
        this.openedModal = data.status
        this.formToggle = !data.status
        this.userId = data.userId
        this.loadEditUser()
      }
    })
  }

  // Esta funcion tiene que traer del back el usuario a editar.
  async loadEditUser() {

    this.service.getById(this.userId).subscribe(
      res => {

        if (res['estado']) {
          console.log(res);
          
          const userData: Funcionario = res['functionary']
          this.loadUserData(userData);
        } else {
          this.closeOnError();
        }
      },
      err => {

        this.closeOnError();
      }
    );
  }

  // Carga los datos del usuario al form
  loadUserData(userData: Funcionario) {
    // Guardamos el nombre de la foto anterior por si no se modifica.
    this.oldPicture = userData.urlFoto;
    
    // Guardamos el correo anterior para detectar si se modifica.
    this.oldMail = userData.correo;

    this.form.patchValue({
      correo: userData.correo,
      nombre: userData.nombre,
      apellido1: userData.apellido_1,
      apellido2: userData.apellido_2,
      departamento: userData.idDepartamento,
      urlFoto: this.oldPicture,
      tipo: userData.idTipoFuncionario,
      sexo: userData.idSexo,
      nacimiento: userData.fechaNacimiento
    })

    setTimeout(() => {
      this.loadUrlFoto(this.oldPicture);
    })
  }

  loadUrlFoto(urlFoto:string){
    this.service.obtainUrlImage(urlFoto).subscribe(res => {
    
     let reader = new FileReader();

     reader.readAsDataURL(res); 
     reader.onloadend = () => { this.preview = reader.result }
    })
  }


  // Esta funcion perpara la edicion del funcionario
  edt_func() {
    
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    // Si el email existe mostramos una alerta.
    if (this.oldMail !== this.form.value.correo) {
/*
      this.service.validateEmail(this.form.value.correo).subscribe(
        res => {
          // Si es true el email esta en el sistema.
          if (res['estado']) {
            return this.alertService.simpleAlert('El email ya se encuentra registrado')
          } else {
            this.proceedUpdate();
          }
        },
        err => {
          return this.alertService.simpleAlert('No se pudo validar el email')
        })*/
        this.proceedUpdate();
    }
  }

  // Procede con la modificacion al asegurarse que los valores son validos.
  proceedUpdate() {
    // Envia datos y espera la respuesta del backend.
    this.service.update(this.obtainFunc()).subscribe(
      res => {
        if (res['estado']) {
          this.closeModal();
          this.alertService.promiseAlert('Se agregó correctamente el funcionario').then(() => {
            this.service.updateNeeded.emit(true)
          })
        } else {
          this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
        }
      },
      err => {
        this.alertService.simpleAlert('Surgió un error inténtelo nuevamente')
      })
  }

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {
    // Si hay un archivo en el evento
    if (event.target.files && event.target.files[0]) {
      const size = (event.target.files[0].size / 1048576)

      // Si el archivo supera el limite
      if (size > MAX_PICTURE) {
        this.form.patchValue({ foto: '' })
        this.preview = '';
        this.form.get('urlFoto')?.setErrors({ 'sizeError': true })
      } else {
        this.form.get('urlFoto')?.setErrors(null)
      }

      // Si no existen errores
      if (!this.form.get('urlFoto')?.errors) {
          this.loadPreview(event);
          this.form.patchValue({ foto: event.target.files[0] })
          this.form.patchValue({ urlFoto: event.target.files[0].name })
      }
    } else {
      this.form.patchValue({ urlFoto: this.oldPicture })
      this.form.patchValue({ foto: '' })
      this.preview = this.oldPicture;
    }
  }

  resetPicture(){
    this.form.patchValue({ urlFoto: this.oldPicture })
    this.form.patchValue({ foto: '' })
    this.preview = this.oldPicture;
  }

  loadPreview(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.preview = event.target?.result;
    }
  }

  // Extrae los datos de un funcionario valido a un objeto funcionario
  obtainFunc(): FormData {
    const postData = new FormData();

    postData.append('idFuncionario', this.userId.toString());
    postData.append('correo',this.oldMail);
    postData.append('idSexo', this.form.value.sexo);
    postData.append('idDepartamento', this.form.value.departamento);
    postData.append('idTipoFuncionario', this.form.value.tipo);
    postData.append('fechaNacimiento', this.form.value.nacimiento);
    postData.append('nombre', this.form.value.nombre);
    postData.append('apellido_1', this.form.value.apellido1);
    postData.append('apellido_2', this.form.value.apellido2);
    postData.append('contrasenia', '12345678');
  
    // Validacion, si cambia la foto sube el file, sino solo pasa url viejo.
    if(this.oldPicture == this.form.value.urlFoto){
      postData.append('urlFoto', this.oldPicture);
    }else{
      postData.append('urlFoto', this.form.value.foto);
    }
    return postData
  }

  // Este metodo cierra el modal mostrando una alerta de error.
  closeOnError() {
    this.alertService.promiseAlert('Surgio un error al cargar el funcionario').then(
      () => {
        this.closeModal();
      }
    )
  }

  // Construye el formulario con los campos requeridos.
  buildForm() {
    this.form = this.formBuilder.group({
      correo: [{value:'', disabled:true}, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
        Validators.minLength(6),
        Validators.maxLength(50)]],
      departamento: ["", [
        Validators.required,
        Validators.min(1),
        Validators.max(255)
      ]],
      tipo: ["", [
        Validators.required,
        Validators.min(1),
        Validators.max(255)
      ]],
      foto: ["", []],
      urlFoto: ["", [
        Validators.required,
        Validators.pattern('^(.)*.(jpe?g|png|PNG|JPE?G)$')
      ]],
      nombre: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      apellido1: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      apellido2: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]],
      sexo: ["", [
        Validators.required,
        Validators.min(1),
        Validators.max(255)
      ]],
      nacimiento: ["", [Validators.required]],
    })
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