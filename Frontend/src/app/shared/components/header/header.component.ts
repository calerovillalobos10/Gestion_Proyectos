import { FuncionariosService } from '@core/services/funcionarios/funcionarios.service';
import { Usuario } from '@core/models/Usuario';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user?: Usuario;
  public urlFoto: any;

  constructor(
    private router: Router,
    private service: FuncionariosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadUrlFoto(this.user?.urlFoto)
  }

  loadUrlFoto(urlFoto:any){
    this.service.obtainUrlImage(urlFoto).subscribe(res => {
     let reader = new FileReader();
     reader.readAsDataURL(res); 
     reader.onloadend = () => { this.urlFoto = reader.result }
    })
  }

  logout() {
    this.authService.logoutUser();
    this.authService.logining.emit(true);
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 500)
  }
}