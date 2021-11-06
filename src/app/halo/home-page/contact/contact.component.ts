import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {

  constructor(private form: FormBuilder,
    private messageService: MessageService,
    private contactService: ContactService) { }

  ngOnInit(): void {
  }

  formContact = this.form.group({
    email: ["",[Validators.required,Validators.email]],
    telephone: ["",[Validators.required]],
    fullname: ["",[Validators.required]],
    content: ["",[Validators.required]],
    type: ["",[Validators.required]]
  });

  get dataForm(){
    return this.formContact.controls;
  }

  onSubmit(){
    if(this.formContact.valid){
      this.contactService.save(this.formContact.value).subscribe(res=>{
        this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Gửi liên hệ thành công'});
      })
    }else{
      this.messageService.add({severity:'error', summary: 'Lỗi', detail: 'Vui lòng nhập đầy đủ thông tin'});
    }
  }
}
