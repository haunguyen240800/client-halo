import { SavedJobService } from './../../../../service/saved-job.service';
import { JobPostActivityService } from './../../../../service/job-post-activity.service';
import { AuthService } from './../../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPost } from 'src/app/model/job-post';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/service/alert.service';

declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [MessageService]
})
export class DetailComponent implements OnInit {

  job!: JobPost;
  relatedJob: JobPost[]=[];
  apiImg = environment.urlImg;
  description = "";
  requirment = "";
  benefit = "";
  constructor(private jobService: JobPostService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private savedJobService: SavedJobService,
    private authService: AuthService,
    private jobPostActivityService: JobPostActivityService,
    private messageService: MessageService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.job = new JobPost();
    this.init();
  }

  async init(){
    await this.getJob();
    this.getJobByCate();
  }

  async getJob(){
    let id =this.activatedRoute.snapshot.params.id;
    await this.jobService.findById(id).toPromise().then(res=>{
      this.job =res;
      $(".description").append(this.job.jobDescription);
      $(".requirment").append(this.job.requirement);
      $(".benefit").append(this.job.benefit);
    })
  }

  savedJob(){
    if (this.authService.isLoggedIn()){
      let decodeToken = this.authService.decodeToken();
      if (decodeToken.roles[0].name == 'ROLE_CANDIDATE'){
        let accId = this.authService.getAccId();
        let data: any ={
          accId: accId,
          jobPostId: this.job.id
        };
        this.savedJobService.savedJob(data).subscribe(res=>{
          this.messageService.add({severity:'success', summary:'Thành công', detail:'Lưu thành công !'});
          // this.getAlertSuccess("Lưu thành công !")
        },(error:HttpErrorResponse) =>{
          // this.getAlertError(error.error.message);
          this.messageService.add({severity:'warn', summary:'Công việc đã lưu !', detail:''});
       })
      }else{
        this.messageService.add({severity:'info', summary:'Vui lòng đăng nhập vào tài khoản ứng viên !', detail:''});
      }
    }else{
      this.messageService.add({severity:'info', summary:'Vui lòng đăng nhập', detail:''});
    }
  }

  // applyJob(id: any,accId: any){
  //   this.commonService.applyJob(id,accId);
  // }

  applyJob(jobId: any,accId: any){
    if (this.authService.isLoggedIn()){
      let decodeToken = this.authService.decodeToken();
      if (decodeToken.roles[0].name == 'ROLE_CANDIDATE'){
        let accIdCan = this.authService.getAccId();
        let data = {
          accId: accIdCan,
          jobPostId: jobId
        }
        this.jobPostActivityService.createJobApply(data).subscribe(res=>{
          // this.getAlertSuccess("Ứng tuyển thành công !");
          this.messageService.add({severity:'success', summary:'Thành công', detail:'Ứng tuyển thành công !'});
          let username = decodeToken.sub;
          this.createAlert(accId, username +" đã ứng tuyển vào công việc của bạn", "Ứng viên");
        },(error:HttpErrorResponse) =>{
          // this.getAlertError("Công việc đã ứng tuyển !");
          this.messageService.add({severity:'warn', summary:'Công việc đã ứng tuyển !', detail:''});
        });
      }else{
        // this.getAlertError("Vui lòng đăng nhập vào tài khoản ứng viên !");
        this.messageService.add({severity:'info', summary:'Vui lòng đăng nhập vào tài khoản ứng viên !', detail:''});
        
      }

    }else{
      // this.getAlertError("Vui lòng đăng nhập !");
      this.messageService.add({severity:'info', summary:'Vui lòng đăng nhập', detail:''});
      
    }
  }

  async createAlert(accId: any, content: any, title?: any){
    let alert = {
      accId: accId,
      content: content,
      status: true,
      title: title
    }
    await this.alertService.create(alert).toPromise().then(res=>{

    })
  }


  getJobByCate(){
    console.log(this.job.objCate.id)
    this.jobService.getJobByCate(this.job.objCate.id).subscribe(res=>{
      this.relatedJob = res;
      this.relatedJob = this.relatedJob.slice(0,6);
    })
  }

  async routerJob(jobId: any){
    let id =this.activatedRoute.snapshot.params.id;
    await this.jobService.findById(jobId).toPromise().then(res=>{
      this.job =res;
    });
    window.scroll(0,0);
  }
}
