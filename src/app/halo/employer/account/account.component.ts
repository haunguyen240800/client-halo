import { LoginService } from './../../../service/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../core/service/auth.service';
import { AccountService } from './../../../service/account.service';
import { Account } from './../../../model/account';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account!: Account;

  constructor(private accService: AccountService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private loginService: LoginService) { }

  async ngOnInit(): Promise<void> {
    await this.getAccount();
    if (this.account){
      this.setInfoAcc();
    }
  }

  infoAcc = this.formBuilder.group({
    id: ["",[Validators.required]],
    email: ["",[Validators.required,Validators.email]],
    username: ["",[Validators.required]],
    telephone: ["",[Validators.required]],
    gender: ["",[Validators.required]],
    birthday: ["",[Validators.required]]
  })

  get getInfoAcc(){
    return this.infoAcc.controls
  }

  setInfoAcc(){
    this.infoAcc.controls.id.setValue(this.account.id);
    this.infoAcc.controls.email.setValue(this.account.email);
    this.infoAcc.controls.username.setValue(this.account.username);
    this.infoAcc.controls.telephone.setValue(this.account.telephone);
    this.infoAcc.controls.gender.setValue(this.account.gender);
    this.infoAcc.controls.birthday.setValue(this.account.birthday);
  }

  async getAccount(){
    let accId: number = this.authService.getAccId();
    await this.accService.getAccount(accId).toPromise().then(res=>{
      this.account =res;
    })
  }

  onSubmit(){
    if (this.infoAcc.valid){
      this.accService.updateAccount(this.infoAcc.value).subscribe(res =>{
        this.commonService.getAlertSuccess("Cập nhật thành công");
      })
    }else{
      this.commonService.getAlertError("Vui lòng nhập đầy đủ thông tin")
    }
  }

}
