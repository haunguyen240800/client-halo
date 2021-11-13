import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Award } from 'src/app/model/award';
import { Resumes } from 'src/app/model/resumes';
import { AwardService } from 'src/app/service/award.service';
import { CommonService } from 'src/app/service/common.service';
import { ResumesService } from 'src/app/service/resumes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.css']
})
export class AwardComponent implements OnInit {

  awardDialog!: boolean; 
  checkEdit!:boolean;
  awards: Award[] = [];
  resume!: Resumes;
  check = false;
  constructor(private form: FormBuilder,
    private awardService: AwardService,
    private authService: AuthService,
    private resumeService: ResumesService,
    private commonService: CommonService) { }

  async ngOnInit(): Promise<void> {
    this.awardDialog = false;
    this.checkEdit = false;
    await this.findResumeByAccId();
    if (this.check){
      this.findAwardByResume();
      this.formAward.controls.resumeId.setValue(this.resume.id);
    }
  }
  
  formAward = this.form.group({
    awardId: [""],
    awardName: ["",[Validators.required]],
    date: ["",[Validators.required]],
    resumeId: ["",[Validators.required]],
    description: ["",[Validators.required]]
  })

  get dataFormAward(){
    return this.formAward.controls
  }

  async findResumeByAccId() {
    if (this.authService.isLoggedIn()) {
      await this.resumeService
        .findByAccId2(this.authService.getAccId())
        .toPromise()
        .then((res) => {
          if (res != null) {
            this.resume = res;
            this.check = true;
          } else {
            this.check = false;
          }
        });
    }
  }

  findAwardByResume(){
    this.awardService.findAwardByResume(this.resume.id).subscribe(res=>{
      this.awards = res;
    })
  }

  openNewFormAward(){
    this.awardDialog = true;
    this.checkEdit = false;
    this.formAward.controls.awardId.setValue("");
    this.formAward.controls.awardName.setValue("");
    this.formAward.controls.date.setValue("");
    this.formAward.controls.description.setValue("");
  }

  setValueFormAward(award: any){
    this.formAward.controls.awardId.setValue(award.awardId);
    this.formAward.controls.awardName.setValue(award.awardName);
    this.formAward.controls.date.setValue(award.date);
    this.formAward.controls.description.setValue(award.description);
  }

  ngCancel(){
    this.awardDialog = false;
  }

  ngSubmit(){
    if (this.formAward.valid){
      this.awardService.save(this.formAward.value).subscribe(res=>{
        this.awards.push(res);
        this.commonService.getAlertSuccess("Thêm thành công");
        this.awardDialog = false;
      })
    }
  }

  ngSubmitUpdate(){
    if (this.formAward.valid){
      this.awardService.update(this.formAward.value).subscribe(res=>{
        this.commonService.getAlertSuccess("Cập nhật thành công");
        this.findAwardByResume();
        this.awardDialog = false;
        this.checkEdit = false;
      })
    }
  }

  onClickEditAward(award: any){
    this.setValueFormAward(award);
    this.awardDialog = true;
    this.checkEdit = true;
  }

  onSubmitDeleteAward(awardId: any){
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
        this.awardService.delete(awardId).subscribe(res=>{
          this.awards = this.awards.filter(item=>{
            return item.awardId != awardId;
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

}
