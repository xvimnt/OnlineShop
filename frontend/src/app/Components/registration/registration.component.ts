import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import { UserInterface } from "../../Models/user_interface";

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
  birthdate: string;

  constructor(public crudService: UserService) { }

  ngOnInit(): void {
  }

  regUser()
  {
    this.crudService.InsertUser(this.firstname, this.lastname, this.password)
    .subscribe((res: UserInterface[]) => {
      this.firstname = "";
      this.lastname = "";
      this.password = "";
    });
  }
}
