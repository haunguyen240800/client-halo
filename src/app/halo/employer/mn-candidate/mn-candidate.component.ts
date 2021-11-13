import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';
import { CommonService } from 'src/app/service/common.service';
import { JobPostActivityService } from 'src/app/service/job-post-activity.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { MailService } from 'src/app/service/mail.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mn-candidate',
  templateUrl: './mn-candidate.component.html',
  styleUrls: ['./mn-candidate.component.css']
})
export class MnCandidateComponent implements OnInit {

  jobs: any[]=[];
  candidates: any[]=[];
  candidatePagi: any[]=[];
  contactDialog: boolean = false;
  toEmail: any;
  accId: any;
  jobId: any;

  constructor(private jobPostService: JobPostService,
    private authService: AuthService,
    private jobPostActivityService: JobPostActivityService,
    private alertService: AlertService,
    private mailService: MailService,
    private commonService: CommonService) { }

  async ngOnInit(): Promise<void> {
    await this.getJob();
    this.getAllCandidate();
  }


  async getJob(){
    let accId = this.authService.getAccId();
    await this.jobPostService.getJobPostByAccount(accId).toPromise().then(res=>{
      this.jobs = res;
    });
  }

  async getAllCandidate(){
    let data: any[]= [];
    for(let i = 0; i< this.jobs.length; i++){
      await this.jobPostActivityService.getCandidate(this.jobs[i].id).toPromise().then(res=>{
        data = data.concat(res);
      })
    }
    this.candidates = data;
    console.log(this.candidates);
  }

  // async getCandidateByJob(){
  //   await this.jobPostActivityService.getCandidate(8).toPromise().then(res=>{
  //     this.candidates =res;
  //     console.log(res);
  //   })
  // }

  onChangePage(event: any){
    let start = event.page * event.rows;
    let end = (event.page * event.rows) + event.rows;
    // this.jobsPagi = this.jobs.slice(start,end);
  }

  remove(accId: any, jobId: any,status: any){
    if (status == 'REJECTED' || status == 'AGREE'){
      Swal.fire({
        title: 'Oops...',
        text: 'Bạn không thể từ chối ứng viên này!',
      })
    }else{
      Swal.fire({
        title: 'Bạn có chắc không??',
        text: "Từ chối ứng viên!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Đồng ý'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.jobPostActivityService.updateStatus(accId,jobId,"REJECTED").toPromise().then(res=>{
            let content = "Cảm ơn bạn đã ứng tuyển, chúng tôi rất xin lỗi khi hồ sơ của bạn không phù hợp với chúng tôi"
            this.createAlert(accId,content);
            this.getAllCandidate();
            Swal.fire(
              'Từ chối thành công!',
            )
          })

        }
      })
    }

  }

  createAlert(accId: any, content: any){
    let alert = {
      accId: accId,
      content: content,
      status: true,
    }
    this.alertService.create(alert).toPromise().then(res=>{

    })
  }

  opentFormContact(email: any,accId: any,jobId: any){
    this.contactDialog = true;
    this.toEmail = email;
    this.accId = accId;
    this.jobId = jobId;
  }

  hideDialog(event: any){
    this.contactDialog = false;
  }

  async submitContact(event: any){
    await this.mailService.sendMail(event).toPromise().then(async res=>{
      await this.jobPostActivityService.updateStatus(this.accId,this.jobId,"AGREE").toPromise().then(res=>{
        let content = "Cảm ơn bạn đã ứng tuyển, chúng tôi đã nhận thấy rằng hồ sơ của bạn phù hợp với chúng tôi, thông báo chi tiết vui lòng xem tại" + event.mailTo;
        this.createAlert(this.accId,content);
        this.getAllCandidate();
      });
    });
    this.commonService.getAlertSuccess("Thành công");
  }
}
