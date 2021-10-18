import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { MustMatch } from 'src/app/model/validate/confirmed-validator';
import { AccountService } from 'src/app/service/account.service';
import { CommonService } from 'src/app/service/common.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private form: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService,
    private accService: AccountService,
    private commonService: CommonService) { }

  ngOnInit(): void {
  }

  formPassword = this.form.group({
    oldPass: ["",[Validators.required]],
    newPass: ["",[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")]],
    confirmPass: ["",[Validators.required]]
  },{
    validator: MustMatch('newPass', 'confirmPass')
  });

  get dataFormPassword(){
    return this.formPassword.controls;
  }

  ngSubmit(){
    if (this.formPassword.valid){
      let decodeToken = this.authService.decodeToken();
      let loginRequest = {
        username: decodeToken.sub, 
        password: this.formPassword.controls.oldPass.value
      }
      this.loginService.login(loginRequest).subscribe(res=>{
        let data ={
          accId: this.authService.getAccId(),
          password:  this.formPassword.controls.newPass.value
        }
        this.accService.changePassword(data).subscribe(res=>{
          this.commonService.getAlertSuccess("Cập nhật thành công");
        })
      })
    }
  }
}
