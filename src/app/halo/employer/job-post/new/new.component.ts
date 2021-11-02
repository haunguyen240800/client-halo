import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Category } from 'src/app/model/category';
import { Company } from 'src/app/model/company';
import { JobType } from 'src/app/model/job-type';
import { Position } from 'src/app/model/position';
import Validation from 'src/app/model/validate/date.validator';
import { AddressService } from 'src/app/service/address.service';
import { CategoryService } from 'src/app/service/category.service';
import { CommonService } from 'src/app/service/common.service';
import { CompanyService } from 'src/app/service/company.service';
import { JobTypeService } from 'src/app/service/job-type.service';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  categories: Category[] = [];
  cities = [];
  positions: Position[] = [];
  jobTypes: JobType[] =[];
  company!: Company;

  educations = [
    { label: "Tốt nghiệp trung cấp" },
    { label: "Tốt nghiệp cao đẳng" },
    { label: "Tốt nghiệp đại học" },
    { label: "Tiến sĩ" },
    { label: "Thạc sĩ" },
    { label: "Giáo sư" },
    { label: "Không yêu cầu" }
  ];

  experiences = [
    { label: "6 tháng" },
    { label: "1 năm" },
    { label: "2 năm" },
    { label: "3 năm" },
    { label: "4 năm" },
    { label: "5 năm" },
    { label: "Trên 5 năm" }
  ];
  genders = [
    { label: "Nam" },
    { label: "Nữ" },
    { label: "Không yêu cầu" },
  ]
  
  constructor(private cateService: CategoryService,
    private addressService: AddressService,
    private positionService: PositionService,
    private form: FormBuilder,
    private jobTypeService: JobTypeService,
    private router: Router,
    private comService: CompanyService,
    private authService: AuthService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.findAllCate();
    this.findAllCity();
    this.findAllPosition();
    this.findAllJobType();
    this.getCompany();

    let data: any = localStorage.getItem('jobPost');  
    let job = JSON.parse(data);
    if (job){
      this.setValueForm(job);
    }
  }

  dataForm = this.form.group({
    id: [""],
    jobTitle: ["",[Validators.required]],
    jobDescription: ["",[Validators.required]],
    salary: ["",[Validators.required]],
    requirement: ["",[Validators.required]],
    benefit: ["",[Validators.required]],
    experience: ["",[Validators.required]],
    education: ["",[Validators.required]],
    gender: ["",[Validators.required]],
    quantity: ["",[Validators.required]],
    positionId: ["",[Validators.required]],
    cateId: ["",[Validators.required]],
    jobTypeId: ["",[Validators.required]],
    deadline: ["",[Validators.required,,Validation.dateValidator()]],
    packageCode: [""],
    companyId: ["",[Validators.required]],
  });

  setValueForm(job: any){
    this.dataForm.controls.jobTitle.setValue(job.jobTitle);
    this.dataForm.controls.jobDescription.setValue(job.jobDescription);
    this.dataForm.controls.salary.setValue(job.salary);
    this.dataForm.controls.requirement.setValue(job.requirement);
    this.dataForm.controls.benefit.setValue(job.benefit);
    this.dataForm.controls.experience.setValue(job.experience);
    this.dataForm.controls.education.setValue(job.education);
    this.dataForm.controls.gender.setValue(job.gender);
    this.dataForm.controls.quantity.setValue(job.quantity);
    this.dataForm.controls.positionId.setValue(job.positionId);
    this.dataForm.controls.cateId.setValue(job.cateId);
    this.dataForm.controls.jobTypeId.setValue(job.jobTypeId);
    this.dataForm.controls.deadline.setValue(job.deadline);
    this.dataForm.controls.packageCode.setValue(job.packageCode);
  }

  get getDataForm(){
    return this.dataForm.controls;
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

  getCompany(){
    let accId = this.authService.getAccId();
    this.comService.getCompanyByAccount(accId).subscribe(res=>{
      this.company = res;
    })
  }

  findAllPosition(){
    this.positionService.findAllPosition().subscribe(res=>{
      this.positions =res;
    })
  }

  findAllJobType(){
    this.jobTypeService.findAllJobType().subscribe(res=>{
      this.jobTypes = res;
    })
  }

  onSubmit(){
    this.dataForm.controls.companyId.setValue(this.company.companyId);
    if (this.dataForm.valid){
      localStorage.setItem("jobPost", JSON.stringify(this.dataForm.value));
      this.router.navigateByUrl("emp/job-post/pkgpayment")
    }else{
      this.commonService.getAlertError("Vui lòng nhập đầy đủ thông tin")
    }
  }

}
