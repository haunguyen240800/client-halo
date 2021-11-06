import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [MessageService]
})
export class JobComponent implements OnInit {
  jobs: any[]= [];
  selectedProducts: any;
  jobPagi: any[] = [];
  listStatus = [
    {label: "Tất cả", value: ""},
    {label: "PENDING", value: "PENDING"},
    {label: "ACTIVE", value: "ACTIVE"},
    {label: "DELETED", value: "DELETED"},
    {label: "EXPIRE", value: "EXPIRE"},
  ]
  dataSearch = {
    status: "",
    fromDate: "",
    toDate: "",
    jobName: ""
  }
  constructor(private jobService: JobPostService,
    private commonService: CommonService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getJob();
  }

  async approve(job: any){
    if (job.status == 'PENDING'){
      let data ={
        id: job.id,
        status: "ACTIVE",
      }
      let accId = job.objCompany.accId;
      await this.jobService.updateStatus(data).toPromise().then(async res1=>{
        let content = "Công việc "+ job.jobTitle + " đã được duyệt";
        let title = "Từ hệ thống Halo Job";
        await this.commonService.createAlert(accId, content, title);
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Duyệt bài thành công'});
        this.getJob();
      });
    }else{
      this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Bài đăng này đã duyệt'});
    }

  }

  async remove(job: any){
    if (job.status == 'PENDING'){
      let data ={
        id: job.id,
        status: "DELETED",
      }
      let accId = job.objCompany.accId;
      await this.jobService.updateStatus(data).toPromise().then(async res1=>{
        let content = "Công việc "+ job.jobTitle + " đã được duyệt";
        let title = "Từ hệ thống Halo Job";
        await this.commonService.createAlert(accId, content, title);
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Duyệt bài thành công'});
        this.getJob();
      })
    }else{
      this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Bài đăng này đã duyệt'});
    }
  }

  search(){
    this.jobService.searchAd(this.dataSearch).subscribe(res=>{
      this.jobs = res;
      this.jobPagi = this.jobs.slice(0,10);
    })
  }

  onChangePage(event: any){
    let start = event.page * event.rows;
    let end = (event.page * event.rows) + event.rows;
    this.jobPagi = this.jobs.slice(start,end);
  }

  getJob(){
    this.jobService.findAll().subscribe(res=>{
      this.jobs = res;
      this.jobPagi = this.jobs.slice(0,10);
    })
  }

}
