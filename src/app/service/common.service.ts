import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/service/auth.service';
import { SavedJobService } from './saved-job.service';
import Swal from 'sweetalert2'
import { JobPostActivityService } from './job-post-activity.service';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl= environment.apiUrl;
  constructor(private http: HttpClient,
    private authService: AuthService,
    private savedJobService: SavedJobService,
    private jobPostActivityService: JobPostActivityService) { }

  savedJob(jobId: any){
    if (this.authService.isLoggedIn()){
      let decodeToken = this.authService.decodeToken(); 
      if (decodeToken.roles[0].name == 'ROLE_CANDIDATE'){
        let accId = this.authService.getAccId();
        let data: any ={
          accId: accId,
          jobPostId: jobId
        };
        this.savedJobService.savedJob(data).subscribe(res=>{
          this.getAlertSuccess("Lưu thành công !")
        },(error:HttpErrorResponse) =>{
          this.getAlertError(error.error.message);
       })
      }else{
        this.getAlertError("Vui lòng đăng nhập");
      }
    }else{
      this.getAlertError("Vui lòng đăng nhập");
    }
  }

  getAlertSuccess(text: any){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  getAlertError(text :any){
    Swal.fire({
      icon: 'error',
      title: 'Lỗi...',
      text: text,
    })
  }

  applyJob(jobId: any){
    if (this.authService.isLoggedIn()){
      let decodeToken = this.authService.decodeToken();
      if (decodeToken.roles[0].name == 'ROLE_CANDIDATE'){
        let accId = this.authService.getAccId();
        let data = {
          accId: accId,
          jobPostId: jobId
        }
        this.jobPostActivityService.createJobApply(data).subscribe(res=>{
          this.getAlertSuccess("Ứng tuyển thành công !");
        },(error:HttpErrorResponse) =>{
          this.getAlertError("Công việc đã ứng tuyển !");
        });
      }else{
        this.getAlertError("Vui lòng đăng nhập vào tài khoản ứng viên !");
      }
      
    }else{
      this.getAlertError("Vui lòng đăng nhập !");
    }
  }
}
