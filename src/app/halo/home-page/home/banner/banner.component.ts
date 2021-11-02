import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Category } from 'src/app/model/category';
import { AddressService } from 'src/app/service/address.service';
import { CategoryService } from 'src/app/service/category.service';
import { CommonService } from 'src/app/service/common.service';
import { JobTypeService } from 'src/app/service/job-type.service';

declare var $: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  categories!: Category[];
  cities: any[]=[];
  jobTypes: any[]=[];
  selectedCity: any;

  constructor(private cateService: CategoryService,
    private addressService: AddressService,
    private jobTypeService: JobTypeService,
    private router: Router,
    private authService: AuthService,
    private commomService: CommonService) { }

  async ngOnInit(): Promise<void> {
    this.findAllCate();
    this.findAllCity();
    this.findAllJobType();
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

  findAllJobType(){
    this.jobTypeService.findAllJobType().subscribe(res=>{
      this.jobTypes = res;
    })
  }

  routerJobs(){
    this.router.navigateByUrl("ct/jobs")
  }
  
  postJobs(){
    let role = this.authService.getRoles();
    if (this.authService.isLoggedIn()){
      if (role == "ROLE_EMPLOYER"){
        this.router.navigateByUrl("emp/job-post/new");
      }else{
        this.commomService.getAlertError("Vui lòng đăng nhập vào tài khoản nhà tuyển dụng");
      }
      
    }else{
      this.commomService.getAlertError("Vui lòng đăng nhập");
    }
  }
}
