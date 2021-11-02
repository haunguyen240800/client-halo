import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageActiveService {
  apiUrl: any= environment.apiUrl;

  constructor(private http: HttpClient) { }

  save(request: any): Observable<any>{
    return this.http.post<any>(this.apiUrl + "package-active/save",request);
  }

  update(request: any): Observable<any>{
    return this.http.put<any>(this.apiUrl + "package-active/update",request);
  }
}
