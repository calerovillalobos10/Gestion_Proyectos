import { Usuario } from './../../../core/models/Usuario';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user?:Usuario;

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.user =  this.authService.getUserData();
  }

  logout(){
      this.authService.logoutUser();
      this.authService.logining.emit(true);
      setTimeout(() => {
        this.router.navigate(['/login'])
      },500)
  }

}
