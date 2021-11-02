import { Component, OnInit } from '@angular/core';
import { JobPostService } from 'src/app/service/job-post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];
  apiImg = environment.urlImg;
  constructor(private jobService: JobPostService) { }

  ngOnInit(): void {
    this.getJobUUD();
  }

  getJobNew(){
    this.jobService.findJobNew().subscribe((res: any)=>{
      this.jobs = res.slice(0,9);
    });
  }

  getJobUUD(){
    this.jobService.getJobUUD().subscribe(res=>{
      this.jobs = res;
      console.log(res);
    });
  }
}
