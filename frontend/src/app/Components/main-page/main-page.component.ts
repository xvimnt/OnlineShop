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
  
  accessPage() {
    let cuser = this.userService.getCurrentUser();
    //console.log(cuser);
    if(cuser != null) {
      switch(cuser['class']) {
        case 'U':
          this.router.navigate(['shop']);
          break;
        case 'A':
          this.router.navigate(['admin']);
          break;
        default:
          this.router.navigate(['forbidden']);
          break;
      }
    }
  }
  ngOnInit(): void {
    this.accessPage();
  }

}
