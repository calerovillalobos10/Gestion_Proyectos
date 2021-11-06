import { ModalSkeleton } from '@core/others/ModalSkeleton';
import { Departamento } from '@core/models/Departamento';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-edt-modal',
  templateUrl: './edt-modal.component.html',
  styleUrls: ['./edt-modal.component.scss']
})
export class EdtModalComponent extends ModalSkeleton implements OnInit {

  private userId: number;
  public preview: string | ArrayBuffer | null | undefined;
  private oldPicture: string;
  private oldMail: string;

  public departamentos: Array<Departamento>;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService,
    private deptService: DepartamentosService
  ) {
    super();
    
    this.preview = '';
    this.userId = 0
    this.oldMail = '';
    this.oldPicture = '';

    this.departamentos = [{ descripcion: 'TI', idDepartamento: 1 }, { descripcion: 'RRHH', idDepartamento: 2 }]//-- Al tener el back ----------------------
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

    //const userData: Funcionario = await this.service.getById(this.userId); //-------------------------------Al tener el back----------------------

    const userData: Funcionario =
    {
      correo: 'Luis@gmail.com', idTipoFuncionario: '1', idDepartamento: '33', nombre: 'Luis', apellido1: "apellido1",
      apellido2: "apellido2", fechaNacimiento: '1995-09-09', idSexo: '1', urlFoto: 'http://localhost:4200/assets/images/not_found_user.png'
    }

    // Guardamos la foto anterior por si no se modifica.
    this.oldPicture = userData.urlFoto;

    // Guardamos el correo anterior para detectar si se modifica.
    this.oldMail = userData.correo;

    // Esto valida si no esta conteneido el departamento enviado.
    if (!this.departamentos.some(e => e.idDepartamento == userData.idDepartamento)) { }

    this.form.patchValue({
      correo: userData.correo,
      nombre: userData.nombre,
      apellido1: userData.apellido1,
      apellido2: userData.apellido2,
      departamento: userData.idDepartamento,
      urlFoto: this.oldPicture,
      tipo: userData.idTipoFuncionario,
      sexo: userData.idSexo,
      nacimiento: userData.fechaNacimiento
    })

    setTimeout(() => {
      this.preview = this.oldPicture;
    })
  }

  // Esta funcion perpara la edicion del funcionario
  edt_func() {

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    // Si el email existe mostramos una alerta.
    if (this.oldMail !== this.form.value.correo && this.service.validateEmail(this.form.value.correo)) {  //-----Al tener el back -------
      return this.alertService.simpleAlert('El nuevo email ya se encuentra registrado')
    }

    // Envia datos y espera la respuesta del backend.
    if (this.service.update(this.obtainFunc())) { //--------------------------------------- Al tener el back ----------------------
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
      this.form.patchValue({ foto: event.target.files[0] })
      this.form.patchValue({ urlFoto: event.target.files[0].name })

      console.log(this.form.value.urlFoto);

    } else {
      this.form.patchValue({ urlFoto: this.oldPicture })
      this.form.patchValue({ foto: '' })
      this.preview = this.oldPicture;
    }
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
    postData.append('correo', this.form.value.correo);
    postData.append('idSexo', this.form.value.sexo);
    postData.append('idDepartamento', this.form.value.departamento);
    postData.append('idTipoFuncionario', this.form.value.tipo);
    postData.append('fechaNacimiento', this.form.value.nacimiento);
    postData.append('nombre', this.form.value.nombre);
    postData.append('apellido1', this.form.value.apellido1);
    postData.append('apellido2', this.form.value.apellido2);
    postData.append('urlFoto', this.form.value.foto);

    return postData
  }

  // Construye el formulario con los campos requeridos.
  buildForm() {
    this.form = this.formBuilder.group({
      correo: ["", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
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
        Validators.pattern('^(.)*.(jpe?g|png)$')
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