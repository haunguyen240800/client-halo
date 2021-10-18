import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/service/address.service';
import { CompanyService } from 'src/app/service/company.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  selectedSort: any;
  companies: any[] =[];
  companiesPagi: any[]=[];
  cities: any;
  apiImg = environment.urlImg;
  sortList = [
    { label: "Sắp xếp", code: "SR-01" },
    { label: "Theo tên a-z", code: "SR-02" },
    { label: "Theo tên z-a", code: "SR-03" },
    // { label: "Sắp xếp", code: "SR-01" },
    // { label: "Sắp xếp", code: "SR-01" },
  ];
  dataSearch: any = {
    companyName: "",
    cityName: "",
  }


  constructor(private comService: CompanyService,
    private addressService: AddressService) { }

  ngOnInit(): void {
    this.findAllCom();
    this.findAllCity();
  }

  findAllCom(){
    this.comService.findAll().subscribe(res=>{
      this.companies = res;
      console.log(res);
      this.companiesPagi = this.companies.slice(0,10);
    })
  }

  findAllCity(){
    this.addressService.findAllCity().subscribe(res=>{
      this.cities=res;
    })
  }

  paginate(event:any){
    let indexStart: number;
    if (event.page == 0){
      indexStart = 0;
    }else{
      indexStart = event.page*event.row;
    }
    this.companiesPagi = this.companies.slice(indexStart, indexStart+event.row)
  }

}
