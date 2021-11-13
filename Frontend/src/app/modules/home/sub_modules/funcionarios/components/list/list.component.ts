import { DT_OPTIONS } from '@core/others/DatatableOptions';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { AlertService } from '@core/services/alert/alert.service';
import { Funcionario } from '@core/models/Funcionario';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  public allRows: Array<Funcionario>;

  ngOnInit(): void {
    this.setTableOptions();
    this.loadTable();

    this.service.updateNeeded.subscribe((data) => {
      if (data) {
        this.loadTable();
      }
    })
  }

  constructor(
    private alertService: AlertService,
    private service: FuncionariosService
  ) {
    this.allRows = [];
  }

  loadTable() {

    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [
          { nombre: 'Luis', apellido_1: 'Leiton', apellido_2: 'Iglesias', urlFoto: '', correo: 'Luis@gmail', fechaNacimiento: '1995-09-09', idDepartamento: 1, idSexo: 1, idTipoFuncionario: 1, idFuncionario: 1 },
          { nombre: 'Luis', apellido_1: 'Leiton', apellido_2: 'Iglesias', urlFoto: '', correo: 'Luis@gmail', fechaNacimiento: '1995-09-09', idDepartamento: 1, idSexo: 1, idTipoFuncionario: 1, idFuncionario: 2 }
        ];

        this.rerender();
      })
  }

  // Llama al modal correspondiente de agregar
  add_func() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  // Llama al modal correspondiente de detalles
  detailsFunc(id: any) {
    this.service.modalNeeded.emit({ subject: 'detModal', status: true, userId: id });
  }

  async deleteFunc(id: any) {
    const func: any = this.getFunc(id);

    this.alertService.confirmAlert(
      '¿Está seguro de eliminar?', `Registro: ${func.nombre} ${func.apellido_1} ${func.apellido_2}`)
      .then(async (res) => {
        // Confirmacion del usuario
        if (res.isConfirmed) {
          this.proceedDelete(id);
        }
      })
  }

  // Procede con la eliminacion de un registro luego de que el usuario lo confirma.
  proceedDelete(id: any) {
    // Confirmacion del servidor.
    this.service.deleteById(id).subscribe(
      res => {
        if (res['estado']) {
          this.alertService.simpleAlert('Se eliminó el registro');
          this.loadTable();
        } else {
          this.alertService.simpleAlert('No se pudo eliminar');
        }
      },
      err => {
        this.alertService.simpleAlert('Surgió un error al eliminar');
      }
    )
  }

  // Llama al modal correspondiente de editar
  editFunc(id: any) {
    let data;
    const table = $('#data').DataTable()

    if (table.row($(this)).data() === undefined) {
      data = table.row($(this).parents("tr")).data();
    } else {
      data = table.row($(this)).data();
    }

    this.service.modalNeeded.emit({ subject: 'editModal', status: true, userId: id });
  }

  // Agrega eventos de escucha a los botones de la tabla
  add_Listeners() {
    const table = $('#data').DataTable()

    $('tbody').on("click", "div.editar", (evt) => {
      const selectedId = evt.target.closest('.row').id;
      this.editFunc(selectedId)
    });

    $('tbody').on("click", "div.eliminar", (evt) => {
      const selectedId = evt.target.closest('.row').id;
     
      this.deleteFunc(selectedId)
    });

    $('tbody').on("click", "div.detalles", (evt) => {
      const selectedId = evt.target.closest('.row').id;
      this.detailsFunc(selectedId)
    });
  }

  // Obtiene el funcionario de la lista.
  getFunc(id: any) {
    let func: Funcionario | undefined = undefined;
    this.allRows.forEach((element) => {
      if (element.idFuncionario == id) {
        func = element;
      }
    });
    return func;
  }

  setTableOptions() {
    this.dtOptions = DT_OPTIONS;
    this.dtOptions.columns = [
      { title: 'Nombre', data: 'nombre', orderable: true },
      { title: 'Primer Apellido', data: 'apellido_1', orderable: true },
      { title: 'Segundo Apellido', data: 'apellido_2', orderable: true },
      { title: 'Sexo', data: 'idSexo', orderable: true },
      { title: 'Departamento', data: 'idDepartamento', orderable: true },
      { title: 'Tipo de Funcionario', data: 'idTipoFuncionario', orderable: true },
      { title: 'Nacimiento', data: 'nacimiento', orderable: true },
      { title: 'Correo', data: 'correo', orderable: true },
      { title: 'Acciones', orderable: false, searchable: false },
    ]

    this.add_Listeners();
  }

  rerender(): void {
    $('#data').DataTable().destroy();
    this.dtTrigger.next();
  }
}