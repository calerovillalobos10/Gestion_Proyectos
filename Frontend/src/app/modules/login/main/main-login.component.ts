import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss']
})
export class MainLoginComponent implements OnInit {

  public logging:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logining.subscribe(data => {
      this.logging = data;
    });
    
  }

}