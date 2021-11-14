import { CompanyService } from 'src/app/service/company.service';
import { environment } from 'src/environments/environment';
import { AddressService } from 'src/app/service/address.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Resumes } from 'src/app/model/resumes';
import { CommonService } from 'src/app/service/common.service';
import { ResumesService } from 'src/app/service/resumes.service';

@Component({
  selector: 'app-gen',
  templateUrl: './gen.component.html',
  styleUrls: ['./gen.component.css']
})
export class GenComponent implements OnInit {

  linkImg = environment.urlImg;
  resume: Resumes = new Resumes();
  provinces: any;
  districts: any;
  wards: any;
  uploadedFiles: any[] = [];
  file!: File; 
  checkFile = false;
  educations = [
    { label: "Tốt nghiệp trung cấp" },
    { label: "Tốt nghiệp cao đẳng" },
    { label: "Tốt nghiệp đại học" },
    { label: "Tiến sĩ" },
    { label: "Thạc sĩ" },
    { label: "Giáo sư" },
    { label: "Khác" }
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
  check = false;
  objImage: any = {};

  constructor(private form: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private resumeService: ResumesService,
    private addressService: AddressService,
    private comService: CompanyService) { }

  async ngOnInit(): Promise<void> {
    await this.findResumeByAccId();
    await this.findAllProvince();
    this.dataForm.controls.accId.setValue(this.authService.getAccId());
    if (this.check){
      this.setValueForm();
      
      this.onChangeCity(this.resume.objAdd.cityName);
      this.onChangeDistrict(this.resume.objAdd.districtName)
    }
  }

  dataForm = this.form.group({
    resumeId: [""],
    accId: [""],
    fullname: ["",[Validators.required]],
    email: ["",[Validators.required,Validators.email]],
    telephone: ["",[Validators.required]],
    gender: ["",[Validators.required]],
    dateOfBirth: ["",[Validators.required]],
    experience: ["",[Validators.required]],
    currentSalary: ["",[Validators.required]],
    expectedSalary: ["",[Validators.required]],
    educationLevel: ["",[Validators.required]],
    targetDescription: ["",[Validators.required]],
    cityName: ["",[Validators.required]],
    districtName: ["",[Validators.required]],
    wardName: ["",[Validators.required]],
    fullAddress: ["",[Validators.required]],
    imageUrl: [""]
  })

  get getData(){
    return this.dataForm.controls;
  }

  setValueForm(){
    this.dataForm.controls.resumeId.setValue(this.resume.id);
    this.dataForm.controls.fullname.setValue(this.resume.fullname);
    this.dataForm.controls.email.setValue(this.resume.email);
    this.dataForm.controls.telephone.setValue(this.resume.telephone);
    this.dataForm.controls.gender.setValue(this.resume.gender);
    this.dataForm.controls.dateOfBirth.setValue(this.resume.dateOfBirth);
    this.dataForm.controls.experience.setValue(this.resume.experience);
    this.dataForm.controls.currentSalary.setValue(this.resume.currentSalary);
    this.dataForm.controls.expectedSalary.setValue(this.resume.expectedSalary);
    this.dataForm.controls.educationLevel.setValue(this.resume.educationLevel);
    this.dataForm.controls.targetDescription.setValue(this.resume.targetDescription);
    this.dataForm.controls.cityName.setValue(this.resume.objAdd.cityName);
    this.dataForm.controls.districtName.setValue(this.resume.objAdd.districtName);
    this.dataForm.controls.wardName.setValue(this.resume.objAdd.wardName);
    this.dataForm.controls.fullAddress.setValue(this.resume.objAdd.fullAddress);
    // this.dataForm.controls.imageUrl.setValue(this.resume.);
  }

  async findResumeByAccId() {
    if (this.authService.isLoggedIn()) {
      await this.resumeService
        .findByAccId2(this.authService.getAccId())
        .toPromise()
        .then((res) => {
          console.log(res);
          if (res != null) {
            this.resume = res;
            this.check = true;
          } else {
            this.check = false;
          }
        });
    }
  }

  async onSubmit(){
    if (this.checkFile){
      await this.uploadFile();
      this.dataForm.controls.imageUrl.setValue(this.objImage.body.location);
    }
    
    if (this.dataForm.valid){
      
      if (this.check){
        this.resumeService.update(this.dataForm.value).subscribe(res=>{
          this.commonService.getAlertSuccess("Cập nhật thành công");
        })
      }else{
        this.dataForm.controls.accId.setValue(this.authService.getAccId());
        this.resumeService.createResume(this.dataForm.value).subscribe(res=>{
          this.commonService.getAlertSuccess("Thêm thành công");
        })
      }
      
    }else{
      this.commonService.getAlertError("Vui lòng nhập đầy đủ thông tin");
    }
  }

  async uploadFile(){
    await this.comService.uploadLogo(this.file).toPromise().then(res=>{
      this.objImage = res;
    })
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

  onUpload(event: any){
    this.checkFile = true;
    this.file = event.currentFiles[0];
  }

  onRemove(event:any){
    this.checkFile = false;
  }
}
