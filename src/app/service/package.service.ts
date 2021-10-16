import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllPackage():Observable<any>{
    return this.http.get<any>(this.apiUrl + "service-packages");    
  }

  getPackageByAcc(accId: any):Observable<any>{
    return this.http.get<any>(this.apiUrl + "service-packages/account?accId="+accId);
  }
}
