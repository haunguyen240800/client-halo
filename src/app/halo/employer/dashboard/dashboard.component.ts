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
  multiAxisData: any;
  multiAxisOptions: any;
  dataDoughnut: any;
  charDoughnuttOptions: any;
  year = new Date().getFullYear();
  dataLine: any[] = [];

  constructor(private authService: AuthService,
    private jobService: JobPostService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getUsername();
    await this.countJobByMonth();
    this.init();

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
              data: [300, 50, 60, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#26ae61",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#26ae61",
                  "#FFCE56"
              ]
          }
      ]
    };
  }
}
