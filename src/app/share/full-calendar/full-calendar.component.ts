import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {
  @Input() options: any;
  @Input() events: any;
  constructor() { }

  ngOnInit(): void {
  }

  init(){
    this.options = {
      initialDate : '2019-01-01',
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true
    };
  }

}
