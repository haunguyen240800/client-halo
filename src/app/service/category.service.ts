import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  findAllCate():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl+"categories");
  }

  findCateById(cateId: any):Observable<Category>{
    let params = new HttpParams();
    params.set("cateId",cateId);
    return this.http.get<Category>(this.apiUrl+"categories/find-by-id",{params});
  }

  createCate(cate: Category):Observable<any>{
    return this.http.post<any>(this.apiUrl+"categories",cate);
  }
}
