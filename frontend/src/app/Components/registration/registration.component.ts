import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  tel: string;
  birthdate: string;

  constructor(public crudService: UserService,private router:Router) { }

  ngOnInit(): void {
  }

  regUser()
  {
    var res = this.crudService.InsertUser(this.firstname, this.lastname, this.password,this.email,this.birthdate)
    .subscribe((res: []) => {
      
      if(res["status"]){
        console.log(res["msg"]);
        this.router.navigate(['admin']);
      }
      else{
        console.log(res["msg"]);
        this.firstname = "";
        this.lastname = "";
        this.password = "";
      }
    });
  } 

}
