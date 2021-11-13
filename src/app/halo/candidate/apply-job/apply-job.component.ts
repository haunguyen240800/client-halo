import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';
import { JobPostActivityService } from 'src/app/service/job-post-activity.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css'],
  providers: [MessageService]
})
export class ApplyJobComponent implements OnInit {

  apiUrl: any = environment.urlImg;
  jobs: any[] = [];
  jobsPagi: any[]=[];

  constructor(private applyJobService: JobPostActivityService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.findJobByAcc();
  }

  findJobByAcc(){
    let accId = this.authService.getAccId();
    this.applyJobService.findByAccId(accId).subscribe(res=>{
      this.jobs = res;
      this.jobsPagi = this.jobs.slice(0,10);
    })
  }

  routerJob(jobId: any){
    this.router.navigateByUrl("ct/jobs/"+jobId);
  }

  removeJobApply(job: any){
    if (job.status == "PENDING"){
      Swal.fire({
        title: 'Bạn có chắc không?',
        text: "Bạn sẽ không thể hoàn tác điều này!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let accId = this.authService.getAccId();
          await this.applyJobService.delete(accId,job.id).subscribe(res=>{
            this.findJobByAcc();
            // this.jobsPagi = this.jobsPagi.filter(item=>{
            //   return item.id != jobId
            // })
          });
          Swal.fire(
            'Đã xóa!',
            'Đã xóa thành công.',
            'success'
          )
        }
      })
    }else{
      this.messageService.add({severity:'info', summary: 'Không thể xóa công việc này', detail: ''});
    }
  }

  onChangePage(event: any){
    let start = event.page * event.rows;
    let end = (event.page * event.rows) + event.rows;
    this.jobsPagi = this.jobs.slice(start,end);
  }

}
