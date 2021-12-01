import { Component, OnInit } from '@angular/core';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cubo',
  templateUrl: './cubo.component.html',
  styleUrls: ['./cubo.component.scss']
})
export class CuboComponent implements OnInit {
  pivotGridDataSource: any;
  constructor() {
    this.pivotGridDataSource = {
      fields: [
          { dataField: '[Funcionario]', area: 'row' },
          { dataField: '[Month]', area: 'column' },
          { dataField: "[Recuento Olap Solicitudes Fact]", area: "data"}
      ],
      store: {
        type: 'xmla',
        url: 'http://192.168.100.136:9500/',
        catalog: 'Olap-InfoAplicada',
        cube: 'DbGestionProyectos'
      }
    }
  }

  ngOnInit(): void {}

  capture() {
    const table: HTMLElement = document.getElementById('cube_table') || new HTMLElement;
    const w = table.offsetWidth;
    const h = table.offsetHeight;
    html2canvas(table, {
      windowHeight: table.scrollHeight,
      scrollX: table.scrollWidth,
      scrollY: table.scrollHeight,
      scale: 3,
      backgroundColor: null
    }).then(function (canvas) {
      //document.body.appendChild(canvas); -- Para pruebas.

      const img = canvas.toDataURL("image/png", 1);
      const doc = new jsPDF('l', 'px', [w, h]);
      doc.addImage(img, 'PNG', 0, 0, w, h);

      doc.save(`Cubo-${Date.now()}.pdf`);
    });
  }
}