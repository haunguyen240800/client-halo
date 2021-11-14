import { HistoryService } from './../../../service/history.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  hisList: any[] = [];
  constructor(private historyService: HistoryService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.historyService.getByAcc(this.authService.getAccId()).subscribe(res=>{
      this.hisList = res;
    })
  }
}
