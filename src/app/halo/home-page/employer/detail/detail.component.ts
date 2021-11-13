import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';
import { Company } from 'src/app/model/company';
import { CommonService } from 'src/app/service/common.service';
import { CompanyService } from 'src/app/service/company.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { ReviewService } from 'src/app/service/review.service';
import { SavedJobService } from 'src/app/service/saved-job.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [MessageService]
})
export class DetailComponent implements OnInit {
  linkImg = environment.urlImg;
  company: Company = new Company();
  jobs: any[]=[];
  apiUrl= environment.urlImg;
  totalJob: number = 0;
  reviewDialog!: boolean;
  reviews: any[]=[];
  reviewsPagi: any[]=[];
  review: any = {};
  display = false;
  length = 4;
  coms: any[]=[];
  comId: any;
  constructor(private comService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private jobPostService: JobPostService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    this.comId = this.activatedRoute.snapshot.params.id;
    this.init();
  }

  async init(){
    this.findByComId(this.comId);
    await this.findJobByComId(this.comId);
    this.totalJob = this.jobs.length;
    this.findReviewByCom(this.comId);
    this.getComUUD3();
  }

  initForm(){
    let comId = this.activatedRoute.snapshot.params.id;
    let accId = this.authService.getAccId();
    this.review.rating ="";
    this.review.content ="";
    this.review.accId = accId;
    this.review.companyId =comId;
  }

  findByComId(comId: any){

    this.comService.findById(comId).subscribe(res =>{
      this.company = res;
    })
  }

  async findJobByComId(comId: any){
    await this.jobPostService.findJobByCompanyId(comId).toPromise().then(res=>{
      this.jobs =res;
    })
  }

  applyJob(id: any,accId: any){
    this.commonService.applyJob(id,accId);
  }

  onSubmitRouter(id: any){
    this.router.navigateByUrl("ct/jobs/"+id);
  }

  rating(){
    for(let i =1;i<=this.company.rating;i++){

    }
  }

  cancel(){
    this.display = false;
  }

  onClickReview(){
    if(this.authService.isLoggedIn()){
      this.display = true;
      this.initForm();
    }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Vui lòng đăng nhập'});
    }

  }

  submitReview(){
    if (this.review.content.length > 0 && this.review.rating){
      this.reviewService.createReview(this.review).subscribe(res=>{
        this.display = false;
        this.init();
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Nhận xét thành công'});
      })
    }
  }

  findReviewByCom(comId: any){
    this.reviewService.findReviewByCom(comId).subscribe(res=>{
      this.reviews = res;
      this.reviewsPagi = this.reviews.slice(0,this.length);

    })
  }

  loadReview(){
    this.length = this.length + 3;
    if (this.length > this.reviews.length){
      this.reviewsPagi = this.reviews.slice(0,this.reviews.length);
    }else{
      this.reviewsPagi = this.reviews.slice(0,this.length);
    }

  }

  refreshReview(){
    this.length = 4;
    this.reviewsPagi = this.reviews.slice(0,this.length);
  }

  getComUUD3(){
    this.comService.getComUUD3("UUD3").subscribe(res=>{
      this.coms = res;
      console.log(res);
    })
  }

  onClickRouterCom(comId: any){
    this.comId = comId;
    this.init();
  }

}
