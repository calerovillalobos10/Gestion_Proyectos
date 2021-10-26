import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public logging:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logining.subscribe(data => {
      this.logging = data;
    });
  }

}
