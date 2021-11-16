import { Subject } from 'rxjs';
import { FilesService } from '@core/services/files/files.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  private graphsUrl = 'http://localhost:4600';

  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  public solicitudeStatusGraph: any = ''
  public advancesTrimGraph: any = ''

  constructor(private fileService: FilesService) { }
  ngOnInit(): void {
    this.loadGraphs();
    this.setTableOptions();
    
  }

  // Carga asíncrona de graficos.
  async loadGraphs() {
    await this.updateTrimGraphYear('Todos');
    await this.updateSolicitudeStatus();
  }

  // Actualiza el estado de las solicitudes.
  async updateSolicitudeStatus() {
    this.advancesTrimGraph = await
      this.fileService.getImageByProm(`${this.graphsUrl}/solicitude_status`)
    this.advancesTrimGraph = await
      this.fileService.convertBlobToBase(this.advancesTrimGraph)
  }

  // Actualiza el estado de avances por trimestre.
  async updateTrimGraphYear(year: any) {
    if (year.target) year = year.target.value

    if (isNaN(year)) {
      this.solicitudeStatusGraph = await
        this.fileService.getImageByProm(`${this.graphsUrl}/advances_by_trim`)
    } else {
      this.solicitudeStatusGraph = await
        this.fileService.postImageByProm(`${this.graphsUrl}/advances_by_year`, { year: year })
    }

    this.solicitudeStatusGraph = await
      this.fileService.convertBlobToBase(this.solicitudeStatusGraph)
  }



  setTableOptions() {
    this.dtOptions = {
      destroy: true,
      processing: false,
      
      responsive: true,
      scrollY: '70vh',
      paging: false,
      colReorder: false,
      searching: false, 
      info: false,

    }
    this.dtTrigger.next();
  }
}