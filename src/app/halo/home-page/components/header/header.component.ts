import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/core/service/auth.service';
import { LoginResponse } from 'src/app/model/login-response';
import { AccountService } from 'src/app/service/account.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
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
      
    }
  }

  logout(){
    this.authService.logout();
  }

  routerLogin(){
    this.router.navigateByUrl("login");
  }
}
