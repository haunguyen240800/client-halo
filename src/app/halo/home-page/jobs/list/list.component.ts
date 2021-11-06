import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Category } from 'src/app/model/category';
import { JobType } from 'src/app/model/job-type';
import { Position } from 'src/app/model/position';
import { AddressService } from 'src/app/service/address.service';
import { CategoryService } from 'src/app/service/category.service';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { JobTypeService } from 'src/app/service/job-type.service';
import { PositionService } from 'src/app/service/position.service';
import { SavedJobService } from 'src/app/service/saved-job.service';
import { environment } from 'src/environments/environment';
import { sortBy } from 'sort-by-typescript';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  apiImg = environment.urlImg;
  jobs: any[]=[];
  jobsPagi: any[]=[];
  jobTypes!: JobType[];
  positions!: Position[];
  categories!: Category[];
  cities: any[]=[];
  totalPage: number[] =[];
  sortList: any[]=[];
  selectedSort = "SORT-00";
  selectedCity: any;
  dataSearch = {
    jobTitle: "",
    cateId: null,
    jobTypeId: null,
    cityName: "",
    positionId: null,
  }
  constructor(private jobPostService: JobPostService,
    private form: FormBuilder,
    private authService: AuthService,
    private savedJobService: SavedJobService,
    private commonService: CommonService,
    private jobTypeService: JobTypeService,
    private cateService: CategoryService,
    private addressService: AddressService,
    private positionService: PositionService) { }

  async ngOnInit(): Promise<void> {
    if (this.commonService.dataSearch){
      this.dataSearch = this.commonService.dataSearch;
      this.commonService.dataSearch = "";
      this.onChange();
    }else{
      await this.findAllJob();
    }

    this.findAllCity();
    this.findAllCate();
    this.findAllPosition();
    this.findAllJobType();
    this.sortList = [
      { code: "SORT-01", label: "Mặc định" },
      { code: "SORT-02", label: "Mới nhất" },
      { code: "SORT-03", label: "Theo mức lương" },
      { code: "SORT-04", label: "Theo tên a-z" }
    ]
    this.loadScript();
  }

  async findAllJob(){
    await this.jobPostService.findJobActive().toPromise().then(res=>{
      this.jobs=res;
      this.jobsPagi = this.jobs.slice(0,10);
    })
  }

  // savedJob(jobId: any){
  //   this.commonService.savedJob(jobId);
  // }

  onChange(){
    if (this.dataSearch.cityName== null){
      this.dataSearch.cityName ="";
    }
    this.jobPostService.searchJob(this.dataSearch).subscribe(res=>{
      this.jobs = res;
      this.jobsPagi = this.jobs.slice(0,10);
    })
  }

  onChangeSort(){
    if (this.selectedSort == 'SORT-04'){
      this.jobs = this.jobs.sort(sortBy('jobTitle'));
      this.jobsPagi = this.jobs.slice(0,10);
    }

    if (this.selectedSort == 'SORT-01'){
      this.findAllJob();
    }
    if (this.selectedSort == 'SORT-02'){
      this.jobs = this.jobs.sort(sortBy('jobTitle'));
      this.jobsPagi = this.jobs.slice(0,10);
    }
    if (this.selectedSort == 'SORT-03'){
      this.jobs = this.jobs.sort(sortBy('salary'));
      this.jobsPagi = this.jobs.slice(0,10);
    }
  }

  findAllJobType(){
    this.jobTypeService.findAllJobType().subscribe(res=>{
      this.jobTypes = res;
      let data = {id: 0, jobTypeName: "Tất cả"}
      this.jobTypes.push(data);
    })
  }

  applyJob(jobId: any){
    this.commonService.applyJob(jobId);
  }

  findAllCate(){
    this.cateService.findAllCate().subscribe(res =>{
      this.categories =res;
    })
  }

  findAllCity(){
    this.addressService.findAllCity().subscribe(res=>{
      this.cities=res;
    })
  }

  findAllPosition(){
    this.positionService.findAllPosition().subscribe(res=>{
      this.positions =res;
      let data = {id: 0, positionName: "Tất cả"}
      this.positions.push(data);
    })
  }

  onChangePage(event: any){
    let start = event.page * event.rows;
    let end = (event.page * event.rows) + event.rows;
    this.jobsPagi = this.jobs.slice(start,end);
  }


  loadScript(){
    $("#slider-range").slider({
      range: !0,
      min: 0,
      max: 10000,
      values: [50, 290],
      slide: function (t: any, a: any) {
        $("#amount").val("$" + a.values[0] + " - $" + a.values[1]);
      },
    });
  }
}
