import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-popup-interview',
  templateUrl: './popup-interview.component.html',
  styleUrls: ['./popup-interview.component.css']
})
export class PopupInterviewComponent implements OnInit {
  
  @Input() width = "40%";
  @Input() contactDialog: boolean = false;
  @Input() toEmail: any = "";
  @Output() hide = new EventEmitter();
  @Output() submit = new EventEmitter();

  constructor(private form: FormBuilder,
    private commonService: CommonService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.formMail.controls.mailTo.setValue(this.toEmail);
  }

  formMail = this.form.group({
    mailTo: ["",[Validators.email]],
    mailSubject: ["",[Validators.required]],
    mailContent: ["",[Validators.required]]
  });

  get dataMail(){
    return this.formMail.controls
  }

  hideDialog(){
    this.hide.emit();
  }

  submitContact(){
    if (this.formMail.valid){
      this.submit.emit(this.formMail.value);
      this.hideDialog();
    }
  }
}
