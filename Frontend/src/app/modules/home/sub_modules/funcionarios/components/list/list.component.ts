import { Funcionario } from '@core/models/Funcionario';
import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { AlertService } from '@core/services/alert/alert.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ColumnMode = ColumnMode;

  constructor(
    private alertService: AlertService,
    private service: FuncionariosService
  ) {
    this.allRows =  [];
  }

  loadTable() {
    
    this.service.getAll().subscribe(
      res => {
        this.allRows = res['estado'] ? res['list'] : [];
      },
      err => {
        this.allRows = [{nombre: 'Luis', apellido_1: 'Leiton', apellido_2:'Iglesias', urlFoto:'', correo: 'Luis@gmail', fechaNacimiento:'1995-09-09',idDepartamento:1, idSexo: 1, idTipoFuncionario:1, idFuncionario:1}];

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
    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Registro: ${func.nombre} ${func.apellido_1} ${func.apellido_2}`)
      .then(async (res) => {
        // Confirmacion del usuario
        if (res.isConfirmed) {
          this.proceedDelete(id);
        }
      })
  }

  // Procede con la eliminacion de un registro luego de que el usuario lo confirma.
  proceedDelete(id:any) {
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
    this.service.modalNeeded.emit({ subject: 'editModal', status: true, userId: id });
  }

  // Obtiene el funcionario de la lista.
  getFunc(id: number) {
    let func: Funcionario | undefined = undefined;
    this.allRows.forEach((element) => {
      if (element.idFuncionario === id) {
        func = element;
      }
    });
    return func;
  }


  setTableOptions() {
    this.dtOptions = {
      destroy: true,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: "copy",
          className: "btn_table copy",
          text: "<i class='far fa-copy'></i>",
          tag: "data-toggle='tooltip' data-placement='top' title='Copiar al Portapapeles'"
        },
        {
          extend: "excel",
          className: "btn_table excel",
          text: "<i class='far fa-file-excel'></i>",
          tag: "data-toggle='tooltip' title='Descargar en excel'"
        },
        {
          extend: "pdf",
          className: "btn_table pdf",
          text: "<i class='far fa-file-pdf'></i>",
          tag: "data-toggle='tooltip' data-placement='top' title='Descargar en pdf'"
        }
      ],
      language: {
        "url": '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
        buttons: {
          copyTitle: 'Copiado al portapapeles',
          copySuccess: {
            _: 'Copiadas %d filas',
            1: 'Copiada 1 fila'
          },
        }
      },

      responsive: true,
      scrollY: '50vh',
      paging: false,
      colReorder: false,
    }
  }

  rerender(): void {
    $('#data').DataTable().destroy();  
    this.dtTrigger.next();
  }

}
