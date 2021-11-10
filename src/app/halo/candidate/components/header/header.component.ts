import { JobPostService } from './../../../../service/job-post.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { CommonService } from 'src/app/service/common.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  accId: any;
  alerts: any[]=[];

  constructor(
    private jobPostService: JobPostService,
    private authService: AuthService,
    private commonService: CommonService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.accId = this.authService.getAccId();
    this.getAlert();
  }


  getAlert(){
    let status = 1;
    this.alertService.getAlert(this.accId, status).toPromise().then(res=>{
      this.alerts =res;
    })
  }
}
