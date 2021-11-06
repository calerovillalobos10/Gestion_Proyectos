import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  constructor() { }
  public pdfSrc = 'https://librosgratisparaleer.com/wp-content/uploads/2021/08/Harry-Potter-y-la-piedra-filosofal-holaebook.pdf'
  ngOnInit(): void {
  }

}
