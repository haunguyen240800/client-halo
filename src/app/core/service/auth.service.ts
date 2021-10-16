
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: any;
  constructor() { }
  
  public setToken(token: string) {
    localStorage.setItem('token', 'Bearer '+token);
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public getAccId(){
    let token: any = this.getToken();
    let helper = new JwtHelperService();
    let decodeToken = helper.decodeToken(token);
    return decodeToken.accId;
  }
  
  public decodeToken(){
    let token: any = this.getToken();
    let helper = new JwtHelperService();
    let decodeToken = helper.decodeToken(token);
    return decodeToken;
  }


  public getRoles(){
    let decodeToken = this.decodeToken();
    return decodeToken.roles;
  }

  public logout() {
    this.removeToken();
    window.location.href='/ct/home';
  }
}
