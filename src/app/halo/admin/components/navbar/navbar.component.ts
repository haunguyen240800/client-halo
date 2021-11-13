import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  roles: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getRole();
  }

  logout(){
    this.authService.logout();
  }

  getRole(){
    this.roles = this.authService.getRoles();
  }
}
