import { JobPostActivityService } from './../../../service/job-post-activity.service';
import { AccountService } from './../../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: any = "";
  accounts: any = {};
  multiAxisData: any;
  multiAxisOptions: any;
  dataDoughnut: any;
  charDoughnuttOptions: any;
  year = new Date().getFullYear();
  dataLine: any[] = [];
  jobs: any[] = [];
  cActive = 0;
  cPending = 0;
  cExpiry = 0;
  candidates: any[]=[];
  thag1: number = 0;
  thag2: number = 0;
  thag3: number = 0;
  thag4: number = 0;
  thag5: number = 0;
  thag6: number = 0;
  thag7: number = 0;
  thag8: number = 0;
  thag9: number = 0;
  thag10: number = 0;
  thag11: number = 0;
  thag12: number = 0;

  constructor(private authService: AuthService,
    private jobService: JobPostService,
    private accountService: AccountService,
    private jobPostActivityService: JobPostActivityService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getJob();
    this.getUsername();
    this.getAllCandidate();
    await this.countJobByMonth();
    this.init();
    this.getAccount();
  }

  async getJob(){
    let accId = this.authService.getAccId();
    let cActive = 0;
    let cPending = 0;
    let cExpiry = 0;
    await this.jobService.getJobPostByAccount(accId).toPromise().then(res=>{
      this.jobs = res;
      for(let i=0;i<this.jobs.length;i++){
        if (this.jobs[i].status == 'ACTIVE'){
          cActive = cActive + 1;
        }
        if (this.jobs[i].status == 'PENDING'){
          cPending = cPending + 1;
        }
        if (this.jobs[i].status == 'EXPIRE'){
          cExpiry = cExpiry + 1;
        }
      }
      this.cActive = cActive;
      this.cPending = cPending;
      this.cExpiry = cExpiry;
    })
  }

  getAccount(){
    this.accountService.getAccount(this.authService.getAccId()).subscribe(res=>{
      this.accounts = res;
    })
  }

  async getAllCandidate(){
    let data: any[]= [];
    console.log(this.jobs);
    for(let i = 0; i< this.jobs.length; i++){
      await this.jobPostActivityService.getCandidate(this.jobs[i].id).toPromise().then(res=>{
        data = data.concat(res);
      })
    }
    this.candidates = data;
    
    if (this.candidates.length > 0) {
      this.candidates.forEach(element => {
        
      });
    }
  }

  getUsername(){
    let decodeToken = this.authService.decodeToken();
    this.username = decodeToken.sub;
    console.log(this.username);
  }

  async countJobByMonth(){
    let accId = this.authService.getAccId();
    await this.jobService.countJobByMonth(accId,this.year).toPromise().then(res=>{
        this.dataLine = res;
    })
  }

  init(){
    let data = [0,0,0,0,0,0,0,0,0,0,0,0];

    if(this.dataLine.length > 0){
        for(let i=0;i< this.dataLine.length;i++){
            data[this.dataLine[i].month] = this.dataLine[i].total;
        }
    }
    this.multiAxisData = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [{
          label: 'Ứng viên',
          fill: false,
          borderColor: '#42A5F5',
          yAxisID: 'y',
          tension: .4,
          data: []
        }, {
          label: 'Công việc',
          fill: false,
          borderColor: '#00bb7e',
          yAxisID: 'y1',
          tension: .4,
          data: data
      }]
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
