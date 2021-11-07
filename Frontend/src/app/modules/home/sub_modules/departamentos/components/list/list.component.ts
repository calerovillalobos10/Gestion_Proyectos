import { Subject } from 'rxjs';
import { DepartamentosService } from '@core/services/departamentos/departamentos.service';
import { AlertService } from '@core/services/alert/alert.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy{
 
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  public columns: any = [];
  public allRows: any = [];

  ColumnMode = ColumnMode;

  ngOnInit(): void {
    
    this.loadTable();
    this.setTableOptions();

    this.service.updateNeeded.subscribe((data) => {
      if (data) {
        this.loadTable();
      }
    })
  }

  constructor(
    private alertService: AlertService,
    private service: DepartamentosService
  ) {}

  loadTable() {
    this.service.getAll().subscribe(
      (res) => {
        if(res['estado']){
          this.allRows =  res['list'];
        }
        this.dtTrigger.next();
      }
    )
  }

  // Actualiza la tabla
  updateTable() {
   
    this.service.getAll().subscribe(
      (res) => {
        this.allRows = !res['estado'] ? [] : res['list'];
   
      },
      (err) => {
        this.allRows = [];
      }
    )
  }

  add_dept() {
    this.service.modalNeeded.emit({ subject: 'addModal', status: true });
  }

  editDept(id: number) {
    this.service.modalNeeded.emit({ subject: 'editModal', status: true, departamentId: id });
  }

  deleteDept(id: number) {
    const dept: any = this.getDept(id);
    this.alertService.confirmAlert('¿Está seguro de eliminar?', `Departamento: ${dept.descripcion}`)
      .then((res) => {

        // Confirmacion del usuario
        if (res.isConfirmed) {

          // Confirmacion del servidor.
          this.service.deleteById(id).subscribe(
            (res)=>{
              if(res['estado']){
                this.alertService.simpleAlert('Se eliminó el registro');
                this.loadTable();
              }else{
                this.alertService.simpleAlert('Surgió un error al eliminar');
              }
            },
            (err)=>{
              this.alertService.simpleAlert('Surgió un error al eliminar'); 
            })
        }
      })
  }

  getDept(id: number) {
    let dept = null;
    this.allRows.forEach((element: { idDepartamento: number; }) => {
      if (element.idDepartamento === id) {
        dept = element;
      }
    });
    return dept;
  }

  ngOnDestroy(): void {
   
    this.dtTrigger.unsubscribe();
  }

  setTableOptions() {
    this.dtOptions = {
      destroy: true,
      processing:true,
      dom: 'Bfrtip',
      buttons:[
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
        "url": '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
      },
      responsive: true,
      scrollY:    '50vh',
      paging:     false,
      colReorder: false,
      
    }
  }
}