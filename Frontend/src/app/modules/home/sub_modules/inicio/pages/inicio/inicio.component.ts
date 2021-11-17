import { Subject } from 'rxjs';
import { FilesService } from '@core/services/files/files.service';
import { Component, OnInit } from '@angular/core';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

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
  public solicitudeChangesGraph: any = ''

  public advancesTrimGraph: any = ''

  constructor(private fileService: FilesService) { }
  ngOnInit(): void {
    this.loadGraphs();
  }

  // Carga asíncrona de graficos.
  async loadGraphs() {
    await this.updateTrimGraphYear('Todos');
    await this.updateSolicitudeGraphYearFinished('Todos');
    await this.updateSolicitudeGraphYearChanged('Todos');
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


  // Actualiza el estado de avances por trimestre que han finalizado.
  async updateSolicitudeGraphYearFinished(year: any) {
    if (year.target) year = year.target.value

    if (isNaN(year)) {
      this.advancesTrimGraph = await
        this.fileService.getImageByProm(`${this.graphsUrl}/solicitude_status`)
    } else {
      this.advancesTrimGraph = await
        this.fileService.postImageByProm(`${this.graphsUrl}/solicitude_status_by_year`, { year: year })
    }

    this.advancesTrimGraph = await
      this.fileService.convertBlobToBase(this.advancesTrimGraph)
  }

  // Actualiza el estado de avances por trimestre que han cambiado.
  async updateSolicitudeGraphYearChanged(year: any) {
    if (year.target) { year = year.target.value };

    if (isNaN(year)) {
      this.solicitudeChangesGraph = await
        this.fileService.getImageByProm(`${this.graphsUrl}/solicitude_changed`)
    } else {
      this.solicitudeChangesGraph = await
        this.fileService.postImageByProm(`${this.graphsUrl}/solicitude_changed_by_year`, { year: year })
    }
    this.solicitudeChangesGraph = await
      this.fileService.convertBlobToBase(this.solicitudeChangesGraph)
  }

  capture() {
    const table: HTMLElement = document.getElementById('graph_table') || new HTMLElement;
    const w = table.offsetWidth;
    const h = table.offsetHeight+ 700;
    html2canvas(table, {
      windowHeight: table.scrollHeight + 700,
      scrollX: table.scrollWidth,
      scrollY: table.scrollHeight,
      scale: 3,
      backgroundColor: null
    }).then(function (canvas) {
      //document.body.appendChild(canvas); -- Para pruebas.

      const img = canvas.toDataURL("image/png", 1);
      const doc = new jsPDF('p', 'px', [w, h]);
      doc.addImage(img, 'PNG', 0, 0, w, h);
      doc.addPage();
      doc.save(`Graficas-${Date.now()}.pdf`);
    });
  }
}