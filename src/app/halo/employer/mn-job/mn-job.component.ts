import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-mn-job',
  templateUrl: './mn-job.component.html',
  styleUrls: ['./mn-job.component.css']
})
export class MnJobComponent implements OnInit {

  jobs: any[]=[];
  jobsPagi: any[]=[];
  constructor(private jobPostService: JobPostService,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.getJob();
  }

  getJob(){
    let accId = this.authService.getAccId();
    this.jobPostService.getJobPostByAccount(accId).subscribe(res=>{
      // if (res){
      //   for(let i=0;i<res.length;i++){
      //     let time1 = new Date(res[i].deadline).getTime();
      //     let time2 = new Date().getTime()
      //     if ( time1  < time2){
      //       let data ={
      //         id: res[i].id,
      //         status: "EXPIRE"
      //       }
      //       this.jobPostService.updateStatus(data).subscribe(res1=>{
      //         console.log(res1);
      //         res[i] = res1;
      //       })
      //     }
      //   }
      // }
      this.jobs = res;
      this.jobsPagi = this.jobs.slice(0,10);
    })
  }

  routerCandidate(jobId: any){

  }

  onChangePage(event: any){
    let start = event.page * event.rows;
    let end = (event.page * event.rows) + event.rows;
    this.jobsPagi = this.jobs.slice(start,end);
  }

  update(job: any){
    if (job.status != "PENDING"){
      this.commonService.getAlertError("Bạn không thể sửa công việc này");
    }else{
      this.router.navigateByUrl("emp/job-post/upadte/"+job.id);
    }
  }

  remove(job :any){
    if (job.status == "PENDING" || job.status == "ACTIVE"){
      let data ={
        id: job.id,
        status: "DELETED"
      }
      this.jobPostService.updateStatus(data).subscribe(res=>{
        this.commonService.getAlertSuccess("Xóa thành công");
        this.getJob();
      })
    }else{
      this.commonService.getAlertError("Bạn không thể xóa công việc này");
    }

  }

  routerDetail(jobId: any){
    this.router.navigateByUrl("ct/jobs/"+jobId);
  }
}
