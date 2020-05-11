import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from "../../Services/user.service";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public crudService: UserService, private router:Router) { }

  ngOnInit(): void {
    
  }

  gotoreg()
  {
    this.router.navigate(['registration']);
  }

  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  }

  login()
  {
    var res = this.crudService.getUser(this.email,this.password)
    .subscribe((res: []) => {
      //console.log(res);
      if(!this.isEmpty(res)){
        this.crudService.setCurrentUser(res);
        
        switch(res['class']) {
          case 'U':
            this.router.navigate(['shop']);
            break;
          case 'A':
            this.router.navigate(['admin']);
            break;
        }
      }
      else{
        Swal.fire({
          title: 'Usuario invalido',
          text: 'E-mail y/o password incorrecta',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        })
      }
    });
  }

}
