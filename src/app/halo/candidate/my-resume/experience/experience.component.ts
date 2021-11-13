import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Experience } from 'src/app/model/experience';
import { Resumes } from 'src/app/model/resumes';
import { CommonService } from 'src/app/service/common.service';
import { ExperienceService } from 'src/app/service/experience.service';
import { ResumesService } from 'src/app/service/resumes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  expDialog = false;
  checkEdit: boolean = false;
  experiences: Experience[] = [];
  check = false;
  resume!: Resumes;

  constructor(private form: FormBuilder,
    private expService: ExperienceService,
    private authService: AuthService,
    private commonService: CommonService,
    private resumeService: ResumesService) { }

  async ngOnInit(): Promise<void> {
    await this.findResumeByAccId();
    if (this.check){
      this.findExpByResume();
      this.formExp.controls.resumeId.setValue(this.resume.id);
    }
  }

  ngOnChanges(): void{
    
  }

  formExp = this.form.group({
    expId: [""],
    resumeId: [""],
    startDate: ["",[Validators.required]],
    endDate: ["",[Validators.required]],
    jobTitle: ["",[Validators.required]],
    companyName: ["",[Validators.required]],
    description: ["",[Validators.required]]
  })

  get dataFormExp(){
    return this.formExp.controls
  }

  setValueEditFormExp(exp: any){
    this.formExp.controls.expId.setValue(exp.expId);
    this.formExp.controls.startDate.setValue(exp.startDate);
    this.formExp.controls.endDate.setValue(exp.endDate);
    this.formExp.controls.jobTitle.setValue(exp.jobTitle);
    this.formExp.controls.companyName.setValue(exp.companyName);
    this.formExp.controls.description.setValue(exp.description);
  }

  setValueNewFormExp(){
    this.formExp.controls.expId.setValue("");
    this.formExp.controls.startDate.setValue("");
    this.formExp.controls.endDate.setValue("");
    this.formExp.controls.jobTitle.setValue("");
    this.formExp.controls.companyName.setValue("");
    this.formExp.controls.description.setValue("");
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

  ngSubmitSave(){
    if (this.formExp.valid){
      this.expService.createExp(this.formExp.value).subscribe(res=>{
        this.experiences.push(res);
        this.commonService.getAlertSuccess("Thêm thành công");
        this.expDialog = false;
      })
    }
  }

  findExpByResume(){
    this.expService.findExpByResume(this.resume.id).subscribe(res=>{
      this.experiences = res;
    })
  }

  addExp(){
    this.checkEdit = false;
    this.expDialog =!this.expDialog;
    this.setValueNewFormExp();
  }

  ngCancel(){
    this.expDialog =false;
    this.checkEdit = false;
  }

  onSubmitDeleteExp(expId: any){
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
        await this.expService.deleteExp(expId).subscribe(res=>{
          this.experiences = this.experiences.filter(item=>{
            return item.expId != expId;
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

  openEditExp(exp: any){
    this.setValueEditFormExp(exp);
    this.expDialog = true;
    this.checkEdit = true;
  }

  ngSubmitUpdate(){
    if (this.formExp.valid){
      this.expService.updateExp(this.formExp.value).subscribe(res=>{
        this.findExpByResume();
        this.commonService.getAlertSuccess("Cập nhật thành công");
        this.expDialog = false;
        this.checkEdit = false;
      })
    }
  }

}
