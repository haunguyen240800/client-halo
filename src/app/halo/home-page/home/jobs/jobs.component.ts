import { Component, OnInit } from '@angular/core';
import { JobPostService } from 'src/app/service/job-post.service';
import { environment } from 'src/environments/environment';

declare var $: any

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];
  apiImg = environment.urlImg;
  jobPagi: any[] = [];
  idxStart = 0;
  idxEnd = 9;
  check = true;
  constructor(private jobService: JobPostService) { }

  ngOnInit(): void {
    this.getJobUUD();
  }

  getJobNew(){
    this.jobService.findJobNew().subscribe((res: any)=>{
      this.jobs = res.slice(0,21);
      this.jobPagi = this.jobs.slice(this.idxStart,this.idxEnd);
      this.check = false;
    });
  }

  getJobUUD(){
    this.jobService.getJobUUD().subscribe(res=>{
      this.jobs = res;
      this.jobPagi = res.slice(this.idxStart,this.idxEnd);
      this.check = true;
    });
  }

  onPre(){
    if (this.idxStart > 0){
      this.idxStart = this.idxStart - 9;
    }else{
      this.idxStart = 0;
    }
    this.idxEnd = this.idxStart +9;
    this.jobPagi = this.jobs.slice(this.idxStart,this.idxEnd);

  }

  onNext(){
    if (this.idxEnd < this.jobs.length){
      this.idxStart = this.idxEnd;
      this.idxEnd = this.idxEnd + 9;
      this.jobPagi = this.jobs.slice(this.idxStart,this.idxEnd);
    }

  }
}

