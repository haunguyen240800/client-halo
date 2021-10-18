import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { SavedJobService } from 'src/app/service/saved-job.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saved-job',
  templateUrl: './saved-job.component.html',
  styleUrls: ['./saved-job.component.css']
})
export class SavedJobComponent implements OnInit {
  apiUrl: any = environment.urlImg;
  savedJobs: any[] = [];
  savedJobsPagi: any[]=[];

  constructor(private savedJobService: SavedJobService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.findSavedJobByAcc();
  }

  findSavedJobByAcc(){
    let accId = this.authService.getAccId();
    this.savedJobService.findSavedJobByAcc(accId).subscribe(res=>{
      this.savedJobs = res;
      this.savedJobsPagi = this.savedJobs.slice(0,10);
    })
  }

  deleteSavedJob(jobId: any){
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không thể hoàn tác điều này!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // let accId = this.authService.getAccId();
        this.savedJobService.deleteSavedJob(jobId).subscribe(res=>{
          this.findSavedJobByAcc();
        });
        Swal.fire(
          'Đã xóa!',
          'Đã xóa thành công.',
          'success'
        )
      }
    })
    
  }
  
  onChangePage(event: any){
    let start = event.page * event.rows;
    let end = (event.page * event.rows) + event.rows;
    this.savedJobsPagi = this.savedJobs.slice(start,end);
  }

  routerJob(jobId: any){
    this.router.navigateByUrl("ct/jobs/"+jobId);
  }

  routerCompany(companyId: any){
    this.router.navigateByUrl("ct/employer/"+companyId);
  }
}
