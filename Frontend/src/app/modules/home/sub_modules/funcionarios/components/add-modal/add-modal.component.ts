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

  public departamentos: Array<Departamento> = [];
  public preview: string | ArrayBuffer | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private alertService: AlertService,
    private deptService: DepartamentosService
  ) {
    super();

    this.deptService.getAll().subscribe(
      res => {
          this.departamentos = !res['estado'] ? [] : res['list'];
      }, 
      err =>{
        this.departamentos = [];
      }
    )

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

  // Realiza validaciones previas de creacion.
  // Si es valido procede con el metodo de crear.
  add_func() {

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    // Si el email existe mostramos una alerta.
    this.service.validateEmail(this.form.value.correo).subscribe(
      res => {

        // Si es true el email esta en el sistema.
        if (res['estado']) {
          return this.alertService.simpleAlert('El email ya se encuentra registrado')
        } else {
          this.proceedCreate();
        }
      },
      err => {
        return this.alertService.simpleAlert('Surgio un error al validar el email')
      }      
    )
  }

  // Luego de validar procede a insertar en la base.
  proceedCreate(){
    // Espera la respuesta del backend.
    this.service.create(this.obtainFunc()).subscribe(
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
      }
    )
  }

  // Metodo para cambiar el preview de la foto del funcionario.
  onFileChange(event: any) {
    const size = (event.target.files[0].size/1048576)

    if(size > 1.25){
      this.form.patchValue({ urlFoto: '' })
      this.form.get('urlFoto')?.setErrors({'sizeError':true})
    }else{
      this.form.get('urlFoto')?.setErrors(null)
    }

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
    postData.append('apellido_1', this.form.value.apellido1);
    postData.append('apellido_2', this.form.value.apellido2);
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