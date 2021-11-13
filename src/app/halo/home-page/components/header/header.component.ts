import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/core/service/auth.service';
import { LoginResponse } from 'src/app/model/login-response';
import { AccountService } from 'src/app/service/account.service';
import { AlertService } from 'src/app/service/alert.service';
import { CommonService } from 'src/app/service/common.service';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginResponse!: LoginResponse;
  check = false;
  isLogin = false;
  username: any = null;
  roles: any[] =[];
  constructor(
    private accService: AccountService,
    private authService: AuthService,
    private router: Router,
    private jobPostService: JobPostService,
    private commonService: CommonService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getJob();
    if (this.authService.isLoggedIn()){
      this.getUser();
      this.getToken();
      this.isLogin=this.authService.isLoggedIn();
    }
  }
  getToken() {
    let token: any = this.authService.getToken();
    if (token != null) {
      let helper = new JwtHelperService();
      let decodeToken = helper.decodeToken(token);
      this.username = decodeToken.sub;
      this.roles = decodeToken.roles;
    }
  }
  getUser() {
    this.accService.loginResponse$.subscribe((res) => {
      this.getToken();
      this.getRoles();
    });
  }

  getRoles() {
    this.roles = this.authService.getRoles();
  }

  onClickPostJob(){
    if (this.authService.isLoggedIn()){
      let roles: any = this.authService.getRoles();
      if (roles[0].name !="ROLE_EMPLOYER"){

      }else{
        this.router.navigateByUrl("employer/manage/post-job");
      }
    }else{
      this.commonService.getAlertError("Vui lòng đăng nhập vào tài khoản nhà tuyển dụng")
    }
  }

  logout(){
    this.authService.logout();
  }

  routerLogin(){
    this.router.navigateByUrl("login");
  }

  async getJob(){
    await this.jobPostService.findJobActive().toPromise().then(async res=>{
      if (res){
        for(let i=0;i<res.length;i++){
          let time1 = new Date(res[i].deadline).getTime();
          let time2 = new Date().getTime()
          if ( time1  < time2  && res[i].status == "ACTIVE"){
            let data ={
              id: res[i].id,
              status: "EXPIRE",
            }
            let accId = res[i].objCompany.accId;
            await this.jobPostService.updateStatus(data).toPromise().then(async res1=>{
              res[i].status = data.status;
              let content = "Công việc "+ res[i].jobTitle + " đã hết hạn ứng tuyển";
              let title = "Từ hệ thống Halo Job";
              await this.commonService.createAlert(accId, content, title);
            })
          }
        }
      }
    })
  }

  // getAlert(){
  //   let status = 1;
  //   this.alertService.getAlert(this.accId, status).toPromise().then(res=>{
  //     this.alerts =res;
  //   })
  // }
}
