import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @ViewChild("header") header!: HeaderComponent ;

  alerts: any[]=[];
  display: boolean = false;
  alert: any;

  constructor(private alertService: AlertService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAlert();
  }

  getAlert(){
    let accId = this.authService.getAccId();
    this.alertService.getAlert(accId).subscribe(res=>{
      this.alerts = res;
    })
  }

  detail(alert: any){
    this.display = true;
    this.alert = alert;
    console.log(alert)
    this.update();
  }

  update(){
    this.alert.status = 0;
    this.alertService.update(this.alert).subscribe(res=>{
      this.header.getAlert();
    })
  }
}
