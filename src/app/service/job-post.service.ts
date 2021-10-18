import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobPost } from 'src/app/model/job-post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  apiUrl: any = environment.apiUrl;
  jobPost!: JobPost;
  
  constructor(private http: HttpClient) { }

  findJobActive():Observable<any>{
    return this.http.get<any>(this.apiUrl+"job-posts/active");
  }

  findJobNew():Observable<any>{
    return this.http.get<any>(this.apiUrl+"job-posts/new");
  }

  findById(id: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"job-posts/id?id="+id);
  }

  findJobByCompanyId(companyId: any){
    return this.http.get<any>(this.apiUrl+"job-posts/company?companyId="+companyId);
  }

  searchJob(data: any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"job-posts/search-job",data);
  }

  getJobByCate(cateId :any): Observable<any>{
    return this.http.get<any>(this.apiUrl+ "job-posts/category?cateId="+cateId);
  }

  getJobPostByAccount(accId: any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"job-posts/account?accId="+accId);
  }
}
