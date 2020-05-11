import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  constructor(public userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
