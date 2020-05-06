import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor( public userService:UserService ) { }

  ngOnInit(): void {
      //this.userService.logout();
  }

}
