import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  apiUrl: any= environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAllCity():Observable<any>{
    return this.http.get<any>(this.apiUrl+"provinces");
  }

  findDistrictByProvince(provinceName: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"provinces/d?provinceName="+provinceName);
  }

  findWardByDistrict(districtName: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"provinces/w?districtName="+districtName);
  }

  // findDistrictByProvince(provinceId: any):Observable<any>{
  //   return this.http.get<any>(this.apiUrl+"provinces/d?provinceId="+provinceId);
  // }

  // findWardByDistrict(districtId: any):Observable<any>{
  //   return this.http.get<any>(this.apiUrl+"provinces/w?districtId="+districtId);
  // }
}
