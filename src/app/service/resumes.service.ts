import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from 'src/app/model/login-response';
import { Resumes } from 'src/app/model/resumes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumesService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  findById(resumeId: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"resumes/id?resumeId="+resumeId);
  }

  createResume(resume: any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"resumes",resume);
  }

  update(resume: any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"resumes",resume);
  }
  
  findByAccId(accId: any): Observable<Resumes>{
    return this.http.get<Resumes>(this.apiUrl+"resumes/accId?accId="+accId);
  }

  findByAccId2(accId: any): Observable<Resumes>{
    return this.http.get<Resumes>(this.apiUrl+"resumes/accId2?accId="+accId);
  }
}
