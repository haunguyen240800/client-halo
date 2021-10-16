import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient) { }

  saved(skill: any):Observable<Skill>{
    return this.http.post<Skill>(this.apiUrl + "resume-skills",skill);
  }

  findSkillByResume(resumeId: any):Observable<Skill[]>{
    return this.http.get<Skill[]>(this.apiUrl+"resume-skills/resumes?resumeId="+resumeId);
  }

  update(skill: any):Observable<any>{
    return this.http.put<any>(this.apiUrl+"resume-skills", skill);
  }

  delete(skillId: any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"resume-skills?skillId="+skillId);
  }
}
