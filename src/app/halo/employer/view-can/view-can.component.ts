import { EducationService } from './../../../service/education.service';
import { AwardService } from './../../../service/award.service';
import { ExperienceService } from './../../../service/experience.service';
import { SkillService } from './../../../service/skill.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumesService } from 'src/app/service/resumes.service';

declare var $:any;

@Component({
  selector: 'app-view-can',
  templateUrl: './view-can.component.html',
  styleUrls: ['./view-can.component.css']
})
export class ViewCanComponent implements OnInit {

  resume: any = {};
  val: any = 90;
  exps: any[] = [];
  edus: any[] = [];
  awards: any[] = [];
  skills: any[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private resumeService: ResumesService,
    private skillService: SkillService,
    private expService: ExperienceService,
    private awrdService: AwardService,
    private eduService: EducationService) { }

  async ngOnInit(): Promise<void> {
    this.resume.objAdd = {};
    let id = this.activatedRoute.snapshot.params.id;
    if (id){
      await this.getResume(id);
      this.getAward(this.resume.id);
      this.getEdu(this.resume.id);
      this.getExp(this.resume.id);
      this.getSkill(this.resume.id);
    }else{
      this.router.navigateByUrl("emp/mn-candidate");
    }
  }

  async getResume(id :any){
   
    await  this.resumeService.findByAccId2(id).toPromise().then(res=>{
      this.resume =res;
    
    })
  }

  getExp(id: any){
    this.expService.findExpByResume(id).subscribe(res=>{
      this.exps = res;
     
    })
  }
  getEdu(id: any){
    this.eduService.findEduByResume(id).subscribe(res=>{
      this.edus = res;
      
    })
  }
  getAward(id: any){
    this.awrdService.findAwardByResume(id).subscribe(res=>{
      this.awards = res;
     
    })
  }
  getSkill(id: any){
    this.skillService.findSkillByResume(id).subscribe(res=>{
      this.skills = res;
     
    })
  }
}
