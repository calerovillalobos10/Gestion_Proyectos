import { RecoveryService } from './../../services/recovery/recovery.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoveryGuard implements CanActivate {
  
  constructor(private service:RecoveryService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.service.isRecovering()){
        this.router.navigate(["/login/recuperar/paso1"])
      }
 
      return true;

  }
  
}
