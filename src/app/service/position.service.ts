import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/model/position';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  apiUrl: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  findAllPosition():Observable<Position[]>{
    return this.http.get<Position[]>(this.apiUrl+"positions");
  }

  findPositionById(positionId: any): Observable<Position>{
    let params = new HttpParams();
    params.set("positionId", positionId);
    return this.http.get<Position>(this.apiUrl+"/id",{params});
  }
}
