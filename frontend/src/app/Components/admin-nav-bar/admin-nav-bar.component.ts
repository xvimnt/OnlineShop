import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from "../../Services/user.service";
@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(public userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  gotoRep() {
    this.router.navigate(['admin']);
  }

  gotoUcrud() {
    this.router.navigate(['ucrud']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
