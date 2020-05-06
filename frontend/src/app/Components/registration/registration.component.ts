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

  fixBirthdate() {
    let birthArray = this.birthdate.split('-');
    this.birthdate = "";
    if(birthArray.length > 0) {
     for(var i = birthArray.length - 1; i >= 0; i--) {
       this.birthdate += birthArray[i];
       if(i >= 1) this.birthdate += '-';
      } 
    }
  }

  regUser()
  {
    this.fixBirthdate();
    this.crudService.InsertUser(this.firstname, this.lastname, this.password,this.tel,'M',this.email,this.birthdate,"U","2")
    .subscribe((res: []) => {
      console.log(res);
      if(res['status']){
        this.crudService.sendEmailConf(this.firstname,this.lastname,this.email);
        this.router.navigate(['confirm']);
      }
      else {
        Swal.fire({
          title: 'Error al registrar usuario',
          text: "Credenciales invalidas",
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  } 

}
