import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from 'src/app/model/education';
import { Experience } from 'src/app/model/experience';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  apiUrl: any= environment.apiUrl;

  constructor(private http: HttpClient) { }

  findExpByResume(resumeId: any):Observable<Experience[]>{
    return this.http.get<Experience[]>(this.apiUrl+"experiences/resume?resumeId="+resumeId);
  }

  createExp(exp: any):Observable<Experience>{
    return this.http.post<Experience>(this.apiUrl+"experiences",exp);
  }

  updateExp(exp: any):Observable<Experience>{
    return this.http.put<Experience>(this.apiUrl+"experiences",exp);
  }

  deleteExp(expId: any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"experiences?expId="+expId);
  }
}
