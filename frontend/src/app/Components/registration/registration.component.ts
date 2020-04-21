import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  regUser()
  {
    console.log(this.firstname);
  }
}
