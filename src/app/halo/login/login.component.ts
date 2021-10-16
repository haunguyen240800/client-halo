import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { AccountService } from 'src/app/service/account.service';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private form: FormBuilder,
    private authService: AuthService,
    private accService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginRequest = this.form.group({
    username: ["",[Validators.required]],
    password: ["",[Validators.required]]
  })
  
  get dataLogin(){
    return this.form.control;
  }

  login(){
    if (this.loginRequest.valid){
      this.loginService.login(this.loginRequest.value).toPromise().then(async (res: any)=>{
        this.authService.setToken(res.accessToken);
        this.accService.loginResponse$.next(res);
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đăng nhập thành công',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("/ct/home");
      },( error:HttpErrorResponse) =>{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Đăng nhập không thành công!',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
       })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

}
