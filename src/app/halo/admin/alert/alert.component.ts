import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: any[]=[];
  display: boolean = false;
  alert: any;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAlert();
  }

  getAlert(){
    this.alertService.getAlert("AD").toPromise().then(res=>{
      this.alerts =res;
    })
  }

  detail(alert: any){
    this.display = true;
    this.alert = alert;
    this.update();
  }

  update(){
    this.alert.status = 0;
    // this.alertService.update(this.alert).subscribe(res=>{
    //   this.alertService.alertResponse$.next(res);
    // })
  }

}
