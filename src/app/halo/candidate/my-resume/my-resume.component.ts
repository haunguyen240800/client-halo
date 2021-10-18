import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.css']
})
export class MyResumeComponent implements OnInit {

  // experiences = [
  //   { label: "6 tháng" },
  //   { label: "1 năm" },
  //   { label: "2 năm" },
  //   { label: "3 năm" },
  //   { label: "4 năm" },
  //   { label: "5 năm" },
  //   { label: "Trên 5 năm" }
  // ];

  // educations = [
  //   { label: "Tốt nghiệp trung cấp" },
  //   { label: "Tốt nghiệp cao đẳng" },
  //   { label: "Tốt nghiệp đại học" },
  //   { label: "Tiến sĩ" },
  //   { label: "Thạc sĩ" },
  //   { label: "Giáo sư" },
  //   { label: "Khác" }
  // ]

  constructor(private form: FormBuilder) { }

  ngOnInit(): void {
  }

  // dataForm = this.form.group({
  //   resumeId: [""],
  //   accId: [""],
  //   fullname: ["",[Validators.required]],
  //   email: ["",[Validators.required,Validators.email]],
  //   telephone: ["",[Validators.required]],
  //   gender: ["",[Validators.required]],
  //   dateOfBirth: ["",[Validators.required]],
  //   experience: ["",[Validators.required]],
  //   currentSalary: ["",[Validators.required]],
  //   expectedSalary: ["",[Validators.required]],
  //   educationLevel: ["",[Validators.required]],
  //   targetDescription: ["",[Validators.required]],
  //   cityName: ["",[Validators.required]],
  //   districtName: ["",[Validators.required]],
  //   wardName: ["",[Validators.required]],
  //   fullAddress: ["",[Validators.required]]
  // })

  // get getData(){
  //   return this.dataForm.controls;
  // }
}
