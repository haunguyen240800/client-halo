import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from 'src/app/model/education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  apiUrl: any= environment.apiUrl;

  constructor(private http: HttpClient) { }

  findEduByResume(resumeId: any):Observable<Education[]>{
    return this.http.get<Education[]>(this.apiUrl+"education-details/resumes?resumeId="+resumeId);
  }

  createEdu(edu: any):Observable<Education>{
    return this.http.post<Education>(this.apiUrl+"education-details",edu);
  }

  updateEdu(edu: any):Observable<Education>{
    return this.http.put<Education>(this.apiUrl+"education-details",edu);
  }

  deleteEdu(id: any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"education-details?id="+id);
  }
}
