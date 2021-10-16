import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  apiImg = environment.urlImg;
  constructor(private jobService: JobPostService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.job = new JobPost();
    this.getJob();
  }

  getJob(){
    let id =this.activatedRoute.snapshot.params.id;
    this.jobService.findById(id).subscribe(res=>{
      this.job =res;
      console.log(res);
    })
  }

  savedJob(jobId: any){
    this.commonService.savedJob(jobId);
  }

  applyJob(){
    let jobId = this.activatedRoute.snapshot.params.id;
    this.commonService.applyJob(jobId);
  }

}
