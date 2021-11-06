import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService]
})
export class AccountComponent implements OnInit {
  username = "";
  accountPagi: any[] = [];
  accounts: any[] = [];
  listRole = [
    {label: "Tất cả", value: ""},
    {label: "Ứng viên", value: "ROLE_CANDIDATE"},
    {label: "Nhà tuyển dụng", value: "ROLE_EMPLOYER"},
    {label: "Nhân viên", value: "ROLE_STAFF"},
  ];
  search = {
    name: "",
    role: ""
  }
  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(){
    this.accService.getAll().subscribe(res=>{
      this.accounts = res;
      this.accountPagi = this.accounts.slice(0,10);
    })
  }

  doSearch(){

  }

  remove(acc: any){

  }

  onChangePage(event: any){

  }

}
