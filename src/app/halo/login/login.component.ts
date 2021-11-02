import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ConfirmedValidator } from 'src/app/model/validate/confirmed-validator';
import { AccountService } from 'src/app/service/account.service';
import { AddressService } from 'src/app/service/address.service';
import { CommonService } from 'src/app/service/common.service';
import { CompanyService } from 'src/app/service/company.service';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  btnBg1 = "";
  btnBg2 = "bg-5";
  selected = false;
  files: any[] = [];
  companySizeList = [
    { label: "10 - 50", value: "10 - 50"},
    { label: "50 - 100", value: "50 - 100"},
    { label: "100 - 150", value: "100 - 150"},
    { label: "150 - 500", value: "150 - 500"},
    { label: "1000 +", value: "1000 +"},
  ];

  provinces: any[]=[];
  districts: any[]=[];
  wards: any[]=[];

  constructor(private loginService: LoginService,
    private form: FormBuilder,
    private authService: AuthService,
    private accService: AccountService,
    private router: Router,
    private comService: CompanyService,
    private addressService: AddressService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.loadScript();
    this.findAllProvince();
    this.formRegister.controls.role.setValue("ROLE_CANDIDATE");
  }

  loginRequest = this.form.group({
    username: ["",[Validators.required]],
    password: ["",[Validators.required]]
  });
  
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
        })
       })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }

  }

  formRegister = this.form.group({
    username: ["",[Validators.required]],
    email: ["",[Validators.required,Validators.email]],
    telephone: ["",[Validators.required]],
    birthday: ["",[Validators.required]],
    imageUrl: [""],
    gender: ["",[Validators.required]],
    password: ["",[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
    confirmPassword: ["",[Validators.required]],
    role: ["",[Validators.required]]
  },{ 
      validator: ConfirmedValidator('password', 'confirmPassword')
    }
  );

  get dataFormRegister(){
    return this.formRegister.controls;
  }

  ngSubmit(){
    console.log(this.formRegister.value);
    if (this.formRegister.valid){
      this.accService.createAcc(this.formRegister.value).subscribe(res=>{
        this.commonService.getAlertSuccess("Đăng ký thành công");
      },( error:HttpErrorResponse) =>{
        this.commonService.getAlertError(error.error.message);
      })
    }
  };

  onClickCan(){
    this.btnBg1 = "";
    this.btnBg2 = "bg-5";
    this.selected = false;
    this.formRegister.controls.role.setValue("ROLE_CANDIDATE");
  }

  onClickEmp(){
    this.btnBg1 = "bg-5";
    this.btnBg2 = "";
    this.selected = true;
    this.formRegister.controls.role.setValue("ROLE_EMPLOYER");
  }

  async findAllProvince() {
    await this.addressService.findAllCity().toPromise().then((res) => {
      this.provinces = res;
    });
  }

  onChangeCity(event: any) {
    this.addressService.findDistrictByProvince(event).subscribe((res) => {
      this.districts = res;
    });
  }

  onChangeDistrict(event: any) {
    this.addressService.findWardByDistrict(event).subscribe((res) => {
      this.wards = res;   
    });
  }

  loadScript(){
    $(".toggle-password").on("click", function (this :any) {
      $(this).toggleClass("active");
      var t = $(".password-field");
      "password" === t.attr("type")
        ? t.attr("type", "text")
        : t.attr("type", "password");
    });
  }

}
