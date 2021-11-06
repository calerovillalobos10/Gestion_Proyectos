import { ModalSkeleton } from '@core/others/ModalSkeleton';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { Departamento } from '@core/models/Departamento';
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

  public departamentos: Array<Departamento>;
  public preview: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService,
    private deptService: DepartamentosService
  ) {
    super();

    
    this.departamentos = [{ descripcion: 'TI', idDepartamento: 1 }, { descripcion: 'RRHH', idDepartamento: 1 },]//------Al tener el back ----

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

  add_func() {

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    // Si el email existe mostramos una alerta.
    if (this.service.validateEmail(this.form.value.correo)) {  //-----------------------------------------------------Al tener el back -----------
      return this.alertService.simpleAlert('El email ya se encuentra registrado')
    }

    // Espera la respuesta del backend.
    if (this.service.create(this.obtainFunc())) { //-----------------------------------------------------Al tener el back -----------
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
    } else {
      this.form.patchValue({ foto: '' })
      this.preview = '';
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

    postData.append('correo', this.form.value.correo);
    postData.append('contrasenia', this.form.value.password);
    postData.append('idSexo', this.form.value.sexo);
    postData.append('idDepartamento', this.form.value.departamento);
    postData.append('idTipoFuncionario', this.form.value.tipo);
    postData.append('fechaNacimiento', this.form.value.nacimiento);
    postData.append('nombre', this.form.value.nombre);
    postData.append('apellido1', this.form.value.apellido1);
    postData.append('apellido2', this.form.value.apellido2);
    postData.append('urlFoto', this.form.value.foto);

    return postData;
  }

  // Metodo para construir el formulario con validaciones
  buildForm() {
    this.form = this.formBuilder.group({
      correo: ["", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
        Validators.minLength(8),
        Validators.maxLength(50)]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]],
      rePassword: ["", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]],
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