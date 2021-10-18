import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPost } from 'src/app/model/job-post';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  job!: JobPost;
  relatedJob: JobPost[]=[];
  apiImg = environment.urlImg;
  constructor(private jobService: JobPostService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router) { }

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
    })
  }

  savedJob(){
    this.commonService.savedJob(this.job.id);
  }

  applyJob(id: any){
    this.commonService.applyJob(id);
  }

  getJobByCate(){
    console.log(this.job.objCate.id)
    this.jobService.getJobByCate(this.job.objCate.id).subscribe(res=>{
      this.relatedJob = res;
      this.relatedJob = this.relatedJob.slice(0,6);
    })
  }

  routerJob(jobId: any){
    this.router.navigateByUrl("jobs/"+jobId);
  }
}
