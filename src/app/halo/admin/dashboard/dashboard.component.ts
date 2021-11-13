import { AccountService } from './../../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  multiAxisData: any;
  multiAxisOptions: any;
  dataDoughnut: any;
  charDoughnuttOptions: any;
  year = new Date().getFullYear();
  dataLine: any[] = [];
  username:any = "";
  jobs: any[] = [];
  cActive = 0;
  cPending = 0;
  cExpiry = 0;
  accList: any[] = [];
  countCan: number = 0;
  countEmp: number = 0;
  data1: any[] = [];
  data2: any[] = [];

  constructor(private jobService: JobPostService,
    private authService: AuthService,
    private accService: AccountService) { }

  async ngOnInit(): Promise<void> {
    // await this.getJob();
    await this.getData1();
    await this.getData2();
    this.getUsername();
    this.init();
    this.getAllAcc();
    

  }

  getUsername(){
    let decodeToken: any = this.authService.decodeToken();
    this.username = decodeToken.sub;
  }

  getData1(){
    this.accService.dashboard("ROLE_CANDIDATE").toPromise().then(res=>{
      this.data1 = res;
    })
  }

  getData2(){
    this.accService.dashboard("ROLE_EMPLOYER").toPromise().then(res=>{
      this.data2 = res;
    })
  }

  getAllAcc(){
    this.accService.getAll().toPromise().then(res=>{
      this.accList = res;
      let can = 0;
      let emp = 0;
      for(let i=0;i<this.accList.length;i++){
        if (this.accList[i].roles[0].name == 'ROLE_CANDIDATE'){
          can = can +1;
        }
        if (this.accList[i].roles[0].name == 'ROLE_EMPLOYER'){
          emp = emp +1;
        }
      }
      this.countCan = can;
      this.countEmp = emp;
    })
  }



  init(){
    let data1 = [0,0,0,0,0,0,0,0,0,0,0,0];
    let data2 = [0,0,0,0,0,0,0,0,0,0,0,0];
    let data3 = [0,0,0,0,0,0,0,0,0,0,0,0];

    if(this.data1.length > 0){
        for(let i=0;i< this.data1.length;i++){
            data1[this.data1[i].month] = this.data1[i].total;
        }
    }
    if(this.data2.length > 0){
      for(let i=0;i< this.data1.length;i++){
          data2[this.data2[i].month] = this.data2[i].total;
      }
  }

    this.multiAxisData = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: 'Ứng viên',
          fill: false,
          borderColor: '#42A5F5',
          yAxisID: 'y',
          tension: .4,
          data: data1
        },
        {
          label: 'Nhà tuyển dụng',
          fill: false,
          borderColor: '#00bb7e',
          yAxisID: 'y1',
          tension: .4,
          data: data2
        },
        {
          label: 'Công việc',
          fill: false,
          borderColor: '#FFCE56',
          yAxisID: 'y1',
          tension: .4,
          data: data3
        }
      ]
    };

    this.multiAxisOptions = {
      stacked: false,
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                  color: '#495057'
              },
              grid: {
                  drawOnChartArea: false,
                  color: '#ebedef'
              }
          }
      }
    };

    this.dataDoughnut = {
      // labels: ['A','B','C'],
      datasets: [
          {
              data: [this.jobs.length, this.cActive, this.cPending, this.cExpiry],
              backgroundColor: [
                  "#FF6384",
                  "#26ae61",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#26ae61",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }
      ]
    };
  }
}
