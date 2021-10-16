import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lưu thành công',
            showConfirmButton: false,
            timer: 1500
          })
        },(error:HttpErrorResponse) =>{
          Swal.fire({
            icon: 'error',
            title: 'Lỗi...',
            text: error.error.message + '!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
       })
      }else{
        $('#exampleModalCenter').modal('show');
      }
    }else{
      $('#exampleModalCenter').modal('show');
    }
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ứng tuyển thành công',
            showConfirmButton: false,
            timer: 1500
          })
        },(error:HttpErrorResponse) =>{
          Swal.fire({
            icon: 'error',
            title: 'Lỗi...',
            text: 'Công việc đã ứng tuyển !',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Vui lòng đăng nhập vào tài khoản ứng viên !',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi...',
        text: 'Vui lòng đăng nhập !',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
}
