import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() totalRecords!: number;
  @Input() rows!: number;
  @Input() rowsPerPageOptions!: number;
  @Output() onChange = new EventEmitter();
  pages: number[]=[];
  selected: number = 1;
  active: any = ""
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.pages=[];
    this.pagi();
  }

  pagi(){
    let page: number = Math.floor(this.totalRecords / this.rows);
    if (this.totalRecords % this.rows != 0){
      page = page +1;
    }
    for (let i = 1;i<= page; i++){
      this.pages.push(i); 
    }
  }

  onClickPage(event: any){
    // this.selected = page;
    // let event: any = {
    //   page: page-1,
    //   rows: this.rows
    // }
    this.onChange.emit(event);
  }

  prev(){
    if (this.selected > 1){
      this.selected = this.selected -1;
      this.onClickPage(this.selected);
    }  
  }

  next(){
    if (this.selected < this.pages.length){
      this.selected = this.selected +1;
      this.onClickPage(this.selected);
    }  
  }


}
