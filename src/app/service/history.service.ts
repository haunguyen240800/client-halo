import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  apiUrl: any= environment.apiUrl;

  constructor(private http: HttpClient) { }

  save(request: any): Observable<any>{
    return this.http.post<any>(this.apiUrl + "history",request);
  }

  getByAcc(accId: any): Observable<any>{
    return this.http.get<any>(this.apiUrl + "history/getByAcc?accId="+accId);
  }
}
