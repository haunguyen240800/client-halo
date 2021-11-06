import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/service/auth.service';
import { SavedJobService } from './saved-job.service';
import Swal from 'sweetalert2'
import { JobPostActivityService } from './job-post-activity.service';
import { JobPostService } from './job-post.service';
import { AlertService } from './alert.service';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl= environment.apiUrl;
  dataSearch: any;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private savedJobService: SavedJobService,
    private jobPostActivityService: JobPostActivityService,
    private jobPostService: JobPostService,
    private alertService: AlertService) { }

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

  checkJob(job: any){
    let time1 = new Date(job.deadline).getTime();
    let time2 = new Date().getTime()
    if ( time1  < time2){
      this.jobPostService.updateStatus("EXPIRE").subscribe(res=>{
        console.log(res);
      })
    }
  }

  async createAlert(accId: any, content: any, title?: any){
    let alert = {
      accId: accId,
      content: content,
      status: true,
      title: title
    }
    console.log(alert);
    await this.alertService.create(alert).toPromise().then(res=>{

    })
  }
}
