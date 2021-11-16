import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http:HttpClient) { }

  // Retorna la promesa de la peticion de la imagen POST
  postImageByProm(url:string, payload: any){
    return this.http.post<any>(url, JSON.stringify(payload), {
        responseType: 'blob' as 'json',
        headers: new HttpHeaders().append('Content-Type', 'image/png')
      }).toPromise()
  }

  // Retorna la promesa de la peticion de la imagen GET
  getImageByProm(url:string){
    return this.http.get<any>(url, {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders().append('Content-Type', 'image/png')
    }).toPromise()
  }

  // Retorna una promesa con el blob convertido a base 64
  convertBlobToBase(blob: any){
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  }

}