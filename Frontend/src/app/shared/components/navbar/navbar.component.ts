
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Permite colorear la pestaña seleccionada.
  public selected_tab!:string;

  constructor(
    
  ){}

  ngOnInit(): void {
    // Colorea en un primer uso la pestaña.
    const selected = document.location.href.split('/')
    this.emmit(selected[selected.length-1]);
  }

  // Al emitir un cambio de pestaña, cambia el color
  emmit(selected:string){
    this.selected_tab = selected;
  }

}