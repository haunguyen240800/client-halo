import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Education } from 'src/app/model/education';
import { Resumes } from 'src/app/model/resumes';
import { CommonService } from 'src/app/service/common.service';
import { EducationService } from 'src/app/service/education.service';
import { ResumesService } from 'src/app/service/resumes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educations: Education[]=[];
  eduDialog!: boolean;
  checkEdit: boolean = false;
  resume!: Resumes;
  check = false;

  constructor(private formBuilder: FormBuilder,
    private eduService: EducationService,
    private authService: AuthService,
    private commonService: CommonService,
    private resumeService: ResumesService) {}

  async ngOnInit(): Promise<void> {
   this.eduDialog =false;
   await this.findResumeByAccId();
   if (this.check){
    this.findEduByResumeId();
    this.formEducation.controls.resumeId.setValue(this.resume.id);
   }
  }

  formEducation = this.formBuilder.group({
    eduId: [''],
    resumeId: ['',],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    educationTitle: ['', [Validators.required]],
    institute: ['', [Validators.required]],
  });

  get dateEducation() {
    return this.formEducation.controls;
  }

  setValueFormEdu(edu: any){
    this.formEducation.controls.eduId.setValue(edu.eduId);
    this.formEducation.controls.startDate.setValue(edu.startDate);
    this.formEducation.controls.endDate.setValue(edu.endDate);
    this.formEducation.controls.educationTitle.setValue(edu.educationTitle);
    this.formEducation.controls.institute.setValue(edu.institute);
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

  openNewFormEdu(){
    this.eduDialog = true;
    this.checkEdit = false;
    this.formEducation.controls.eduId.setValue("");
    this.formEducation.controls.startDate.setValue("");
    this.formEducation.controls.endDate.setValue("");
    this.formEducation.controls.educationTitle.setValue("");
    this.formEducation.controls.institute.setValue("");
  }

  findEduByResumeId(){
    this.eduService.findEduByResume(this.resume.id).subscribe(res=>{
      this.educations = res;
    })
  }

  ngSubmit() {
    if (this.formEducation.valid){
      this.eduService.createEdu(this.formEducation.value).subscribe(res=>{
        this.educations.push(res);
        this.commonService.getAlertSuccess("Thêm thành công")
        this.eduDialog = false;
      })
    }else{
      this.commonService.getAlertError("Vui lòng nhập đầy đủ thông tin")
    }
  }

  ngCancel(){
    this.checkEdit = false;
    this.eduDialog = false;
  }

  onSubmitDeleteEdu(eduId: any){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.eduService.deleteEdu(eduId).subscribe(res=>{
          this.educations = this.educations.filter(item=>{
            return item.eduId != eduId;
          })
        })
        Swal.fire(
          'Deleted!',
          'Xóa thành công.',
          'success'
        )
      }
    })
  }

  ngSubmitUpdate(){
    this.eduService.updateEdu(this.formEducation.value).subscribe(res=>{    
      this.findEduByResumeId();
      this.commonService.getAlertSuccess("Cập nhật thành công")
      this.eduDialog = false;
      this.checkEdit = false;
    })
  }

  onClickEditEdu(edu: any){
    this.setValueFormEdu(edu);
    this.eduDialog = true;
    this.checkEdit = true;
  }

}
