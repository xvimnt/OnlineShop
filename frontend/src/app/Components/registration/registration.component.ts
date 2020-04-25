import { Component, OnInit } from '@angular/core';
import { UserService } from "../../Services/user.service";
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

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
        this.router.navigate(['confirm']);
      }
      else{
        Swal.fire({
          title: 'Error al registrar usuario',
          text: res["msg"],
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
        
        this.firstname = "";
        this.lastname = "";
        this.password = "";
      }
    });
  } 

}
