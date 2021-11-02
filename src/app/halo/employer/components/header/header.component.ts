import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  accId: any;
  alerts: any[]=[];

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService,
    private commonService: CommonService,
    private alertService: AlertService
  ) { }

  async ngOnInit(): Promise<void> {
    this.accId = this.authService.getAccId();
    // await this.getJob();
    this.getAlert();
  }

  // async getJob(){
  //   await this.jobPostService.getJobPostByAccount(this.accId).toPromise().then(async res=>{
  //     if (res){
  //       for(let i=0;i<res.length;i++){
  //         let time1 = new Date(res[i].deadline).getTime();
  //         let time2 = new Date().getTime()
  //         if ( time1  < time2  && res[i].status == "ACTIVE"){
  //           let data ={
  //             id: res[i].id,
  //             status: "EXPIRE"
  //           }
  //           await this.jobPostService.updateStatus(data).toPromise().then(async res1=>{
  //             res[i].status = data.status;
  //             let title =
  //             let content = "Công việc "+ res[i].jobTitle + "đã hết hạn ứng tuyển";
  //             await this.commonService.createAlert(this.accId,content);
  //           })
  //         }
  //       }
  //     }
  //   })
  // }

  getAlert(){
    let status = 1;
    this.alertService.getAlert(this.accId, status).toPromise().then(res=>{
      this.alerts =res;
    })
  }
}
