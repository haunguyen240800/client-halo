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

  resume!: Resumes;
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

  constructor(private form: FormBuilder,
    private commonService: CommonService,
    private authService: AuthService,
    private resumeService: ResumesService) { }

  async ngOnInit(): Promise<void> {
    await this.findResumeByAccId();
    if (this.check){
      this.setValueForm();
    }
  }

  dataForm = this.form.group({
    resumeId: [""],
    accId: [""],
    addId: [""],
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
    fullAddress: ["",[Validators.required]]
  })

  get getData(){
    return this.dataForm.controls;
  }

  setValueForm(){
    this.dataForm.controls.resumeId.setValue(this.resume.id);
    this.dataForm.controls.accId.setValue(this.authService.getAccId());
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
    this.dataForm.controls.addId.setValue(this.resume.objAdd.id);
  }

  async findResumeByAccId() {
    if (this.authService.isLoggedIn()) {
      await this.resumeService
        .findByAccId(this.authService.getAccId())
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

  onSubmit(){
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
}
