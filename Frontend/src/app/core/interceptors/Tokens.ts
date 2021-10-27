
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    // Obtiene el token del storage.
    const idToken = localStorage.getItem("id_token");

    // Si existe lo adjunta al request mediante un header de Bearer.
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    // Si no existe envia el request sin token, eventualmente fallará para algunas solicitudes.
    else {
      return next.handle(req);
    }
  }
}