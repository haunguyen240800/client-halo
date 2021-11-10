import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Company } from 'src/app/model/company';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

  company: any;
  username!: string;
  companySizeList: any;
  provinces: any;
  districts: any;
  wards: any;
  constructor(private authService: AuthService,
    private comService: CompanyService,
    private form: FormBuilder,
    private addressService: AddressService,
    private commonService: CommonService) { }

  async ngOnInit(): Promise<void> {
    this.company = new Company();
    this.companySizeList = [
      { label: "10 - 50", value: "10 - 50"},
      { label: "50 - 100", value: "50 - 100"},
      { label: "100 - 150", value: "100 - 150"},
      { label: "150 - 500", value: "150 - 500"},
      { label: "1000 +", value: "1000 +"},
    ]
    await this.getCompany(); 
    this.getUsername();
    await this.findAllProvince();
    this.onChangeCity(this.company.objAddress.cityName);
    this.onChangeDistrict(this.company.objAddress.districtName)
  }

  async getCompany(){
    let accId = this.authService.getAccId();
    await this.comService.getCompanyByAccount(accId).toPromise().then(res=>{
      this.company = res;
      console.log(res);
    })
  }

  getUsername(){
    let decodeToken = this.authService.decodeToken();
    this.username = decodeToken.sub;
  }

  async findAllProvince() {
    await this.addressService.findAllCity().toPromise().then((res) => {
      this.provinces = res;
    });
  }

  onChangeCity(event: any) {
    this.addressService.findDistrictByProvince(event).subscribe((res) => {
      this.districts = res;
    });
  }

  onChangeDistrict(event: any) {
    console.log(event)
    this.addressService.findWardByDistrict(event).subscribe((res) => {
      this.wards = res;   
    });
  }

  onSubmit(){
    this.comService.update(this.company).subscribe(res=>{
      this.commonService.getAlertSuccess("Cập nhật thành công");
    })
  }
}
