import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginResponse: any;

  constructor(private authService: AuthService,
    private accService: AccountService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url:string = state.url;
      let token: any = this.authService.getToken();
      let helper = new JwtHelperService();
      let decodeToken = helper.decodeToken(token);
      console.log(route.data.roles[0])
      if (route.data.roles[0]===decodeToken.roles[0].name){
        return true;
      }else{
        this.router.navigateByUrl('ct/home');
      } 
      return false;
  }
  
}
