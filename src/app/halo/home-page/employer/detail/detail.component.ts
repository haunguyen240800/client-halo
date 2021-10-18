import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Company } from 'src/app/model/company';
import { CommonService } from 'src/app/service/common.service';
import { CompanyService } from 'src/app/service/company.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { SavedJobService } from 'src/app/service/saved-job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  company: Company = new Company();
  jobs: any[]=[];
  apiUrl= environment.urlImg;
  totalJob: number = 0;
  reviewDialog!: boolean;
  review: any;

  constructor(private comService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private jobPostService: JobPostService,
    private router: Router,
    private commonService: CommonService) { }

  async ngOnInit(): Promise<void> {
    this.findByComId();
    await this.findJobByComId();
    this.totalJob = this.jobs.length;
  }

  findByComId(){
    let comId = this.activatedRoute.snapshot.params.id;
    this.comService.findById(comId).subscribe(res =>{
      this.company = res;
    })
  }

  async findJobByComId(){
    let comId = this.activatedRoute.snapshot.params.id;
    await this.jobPostService.findJobByCompanyId(comId).toPromise().then(res=>{
      this.jobs =res;
    })
  }

  applyJob(id: any){
    this.commonService.applyJob(id);
  }

  onSubmitRouter(id: any){
    this.router.navigateByUrl("ct/jobs/"+id);
  }

  rating(){
    for(let i =1;i<=this.company.rating;i++){

    }
  }

}
