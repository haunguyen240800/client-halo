import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Resumes } from 'src/app/model/resumes';
import { Skill } from 'src/app/model/skill';
import { CommonService } from 'src/app/service/common.service';
import { ResumesService } from 'src/app/service/resumes.service';
import { SkillService } from 'src/app/service/skill.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {

  resume!: Resumes;
  check = false;
  skills: Skill[] = [];
  skillDialog!: boolean;
  checkEdit!: boolean;
  
  constructor(private form: FormBuilder, 
    private skillService: SkillService,
    private authService: AuthService,
    private resumeService: ResumesService,
    private commonService: CommonService) {}

  async ngOnInit(): Promise<void> {
    this.skillDialog = false;
    this.checkEdit = false;
    await this.findResumeByAccId();
    if (this.check){
      this.findSkillByResume();
      this.formSkill.controls.resumeId.setValue(this.resume.id);
    }
  }


  formSkill = this.form.group({
    resumeId: ['', [Validators.required]],
    skillName: ['', [Validators.required]],
    skillId: [''],
    percent: ['', [Validators.required]],
  });

  get dataFormSkill() {
    return this.formSkill.controls;
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

  findSkillByResume() {
    this.skillService.findSkillByResume(this.resume.id).subscribe((res) => {
      this.skills = res;
    });
  }

  openNewFormSkill() {
    this.checkEdit = false;
    this.skillDialog = true;
    this.formSkill.controls.skillName.setValue('');
    this.formSkill.controls.skillId.setValue('');
    this.formSkill.controls.percent.setValue('');
  }

  setValueFormSkill(skill: any) {
    this.formSkill.controls.skillName.setValue(skill.skillName);
    this.formSkill.controls.skillId.setValue(skill.skillId);
    this.formSkill.controls.percent.setValue(skill.skillId);
  }

  ngCancel() {
    this.skillDialog = false;
  }

  openEditSkill(skill: any) {
    this.setValueFormSkill(skill);
    this.skillDialog = true;
    this.checkEdit = true;
  }

  onSubmitDeleteSkill(skillId: any) {
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
        await this.skillService.delete(skillId).subscribe((res) => {
          this.skills = this.skills.filter((item) => {
            return item.skillId != skillId;
          });
        });
        Swal.fire(
          'Deleted!',
          'Xóa thành công.',
          'success'
        )
      }
    })
  }

  ngSubmit() {
    if (this.formSkill.valid) {
      this.skillService.saved(this.formSkill.value).subscribe((res) => {
        this.skills.push(res);
        this.commonService.getAlertSuccess("Thêm thành công")
        this.skillDialog = false;
      });
    }
  }

  ngSubmitUpdate() {
    if (this.formSkill.valid) {
      this.skillService.update(this.formSkill.value).subscribe((res) => {
        this.findSkillByResume();
        
        this.skillDialog = false;
      });
    }
  }
}
