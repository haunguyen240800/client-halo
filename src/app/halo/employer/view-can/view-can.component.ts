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

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private resumeService: ResumesService) { }

  ngOnInit(): void {
    this.resume.objAdd = {};
    let id = this.activatedRoute.snapshot.params.id;
    if (id){
      this.getResume(id);
    }else{
      this.router.navigateByUrl("emp/mn-candidate");
    }
  }

  getResume(id :any){
   
    this.resumeService.findById(id).subscribe(res=>{
      this.resume =res;
      console.log(res);
    })
  }
}
