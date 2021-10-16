import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobType } from 'src/app/model/job-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  apiUrl: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  findAllJobType():Observable<JobType[]>{
    return this.http.get<JobType[]>(this.apiUrl+"job-types");
  }

  findJobTypeById(jobTypeId: any):Observable<JobType>{
    let params = new HttpParams();
    params.set("jobTypeId",jobTypeId);
    return this.http.get<JobType>(this.apiUrl+"job-types/id",{params});
  }
}
