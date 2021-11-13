import { AccountService } from 'src/app/service/account.service';
import { CommonService } from './../../../../service/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest,IPayPalConfig } from 'ngx-paypal';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';
import { HistoryService } from 'src/app/service/history.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { PackageService } from 'src/app/service/package.service';
import { DatePipe } from '@angular/common';
import { PackageActiveService } from 'src/app/service/package-active.service';
import { AlertService } from 'src/app/service/alert.service';
// import { PayPalConfig } from 'ngx-paypal';


declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [MessageService]
})
export class PaymentComponent implements OnInit {

  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };
  acc: any = {};
  payPalConfig!: IPayPalConfig;

  listPackage: any[]= [];
  packageAcc: any[] = [];
  selected: any;
  jobPost!: any;
  packageCode: any;
  checked = false;
  paidFor = false;
  package: any;


  constructor(private packageService: PackageService,
    private authService: AuthService,
    private jobPostService:JobPostService,
    private router: Router,
    private messageService: MessageService,
    private historyService: HistoryService,
    private datePipe: DatePipe,
    private packageActiveService: PackageActiveService,
    private alertService: AlertService,
    private commonService: CommonService,
    private accService: AccountService) { }

  async ngOnInit(): Promise<void> {
    let data: any = localStorage.getItem('jobPost');
    this.jobPost = JSON.parse(data);
    await this.getAccount();
    this.init();

    if (this.jobPost){
      this.getAllPackage();
      this.getAccountPackage();
    }else{
      this.router.navigateByUrl("/emp/job-post/new")
    }
  }

  getAllPackage(){
    this.packageService.getAllPackage().subscribe(res=>{
      this.listPackage = res;
    })
  }

  getAccountPackage(){
    let accId = this.authService.getAccId();
    this.packageService.getPackageByAcc(accId).subscribe(res=>{
      this.packageAcc =res;
      if (this.packageAcc.length > 0){
        this.checked = true;
      }
    })
  }

  onSubmit(){
    if (this.checked){
      this.jobPost.packageCode = this.selected;
      if (this.checked){
        this.jobPostService.createJob(this.jobPost).subscribe(res=>{
          localStorage.removeItem("jobPost");
          this.accService.updateJobNumber(this.authService.getAccId(),this.acc.jobNumber - 1);
          this.createAlert("Nhà tuyển dụng đã đăng 1 công việc mới", "Nhà tuyển dụng");
          this.router.navigateByUrl("emp/job-post/confitmation");
        })
      }
    }
  }

  async createAlert(content: any, title?: any){
    let alert = {
      accId: "AD",
      content: content,
      status: true,
      title: title
    }
    await this.alertService.create(alert).toPromise().then(res=>{

    })
  }

  saveHistory(){
    let accId = this.authService.getAccId();
    let his = {
      accId: accId,
      totalMoney: this.package.price,
      packageId: this.package.id
    }
    
    this.historyService.save(his).subscribe(res=>{

    });
  }

  onChangeRadio(event: any){
    this.package = event;
  }

  init(){
    this.payPalConfig = {
      currency: "EUR",
      clientId: "AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR",
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: this.package.price,
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: this.package.price
                  }
                }
              }
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {
        });
      },
      onClientAuthorization: data => {
        this.checked = true;
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Thanh toán thành công'});
        this.savePackageActive();

      },
      onCancel: (data, actions) => {
        this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Thanh toán không thành công'});
      },
      onError: err => {
        this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Thanh toán không thành công'});
      },
      onClick: (data, actions) => {
        // console.log("onClick", data, actions);
      }
    };

  }


  savePackageActive(){
    let accId = this.authService.getAccId();
    let date = new Date();
    let startDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    let endDate = this.datePipe.transform(date.setDate(date.getDate()+30), 'yyyy-MM-dd');

    let tmp = {
      accId: accId,
      servicePackageId: this.package.id,
      startDate: startDate,
      endDate: endDate,
      status: true
    }

    this.packageActiveService.save(tmp).subscribe(res=>{
      this.accService.updateJobNumber(this.authService.getAccId(),this.acc.jobNumber + 30);
      this.packageAcc.push(this.package);
      this.saveHistory();
    });
  }

  async getAccount(){
    await this.accService.getAccount(this.authService.getAccId()).toPromise().then(res=>{
      this.acc = res;
      console.log(res);
    })
  }
}
