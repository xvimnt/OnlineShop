import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor( public userService:UserService, private router:Router ) { }

  ngOnInit(): void {
    let cuser = this.userService.getCurrentUser();
    //console.log(cuser);
    if(cuser != null) {
      switch(cuser[0][12]) {
        case "A":
          this.router.navigate(['admin']);
          break;
          case "U":
          this.router.navigate(['shop']);
          break;
      }
    }
  }

}
