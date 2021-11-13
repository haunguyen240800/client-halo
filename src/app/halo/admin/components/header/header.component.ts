import { AuthService } from './../../../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  alerts: any[] = [];
  constructor(private authService:AuthService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAlert();
  }

  logout(){
    this.authService.logout();
  }

  getAlert(){
    let status = 1;
    this.alertService.getAlert("AD", status).toPromise().then(res=>{
      this.alerts =res;
      console.log(res);

    })
  }
}
