import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Award } from '../model/award';

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  findAwardByResume(resumeId: any):Observable<Award[]>{
    return this.http.get<Award[]>(this.apiUrl+"awards/resumes?resumeId="+resumeId)
  }
  
  save(award: any):Observable<Award>{
    return this.http.post<Award>(this.apiUrl+"awards",award);
  }

  delete(awardId: any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"awards?resumeId="+awardId);
  }

  update(award: any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"awards",award);
  }
}
