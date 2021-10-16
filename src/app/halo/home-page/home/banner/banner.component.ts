import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { AddressService } from 'src/app/service/address.service';
import { CategoryService } from 'src/app/service/category.service';
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
    private jobTypeService: JobTypeService) { }

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
  
}
