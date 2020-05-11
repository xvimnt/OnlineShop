import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from "../../Services/user.service";
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.css']
})
export class UsercrudComponent implements OnInit {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  tel: string;
  birthdate: string;
  type: string;
  genre: string;
  users: [];
  selected: boolean;
  selectedUser: string;

  constructor(private router:Router, public crudService: UserService, private changeDetectorRefs: ChangeDetectorRef) { }
  
  accessPage() {
    let cuser = this.crudService.getCurrentUser();
    //console.log(cuser);
    if(cuser == null) {
      this.router.navigate(['/']);
    }
    else {  
      switch(cuser['class']) {
        case 'A':
          break;
        default:
          this.router.navigate(['forbidden']);
          break;
      }
    }
  }

  ngOnInit(): void {
    this.accessPage();
    this.getTable();
    this.clean();
  }

  clean() {
    this.type = "U";
    this.genre = "M";
    this.firstname = "";
    this.lastname = "";
    this.password = "";
    this.email = "";
    this.tel = "";
    this.birthdate = "";
    this.selected = false;
    this.selectedUser = "";
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

  select(User) {
    this.selected = true;
    this.type = User.class;
    this.genre = User.genre;
    this.firstname = User.firstname;
    this.lastname = User.lastname;
    this.password = User.password;
    this.email = User.email;
    this.tel = User.tel;
    this.birthdate = User.birthdate;
    this.selected = true;
    this.selectedUser = this.email;
  }

  updateUser() {
    this.crudService.UpdateUser(this.firstname, this.lastname, this.password,this.tel,this.genre,this.email,this.birthdate,this.type, this.selectedUser)
    .subscribe((res: []) => {
      //console.log(res);
      if(res['status']){
        Swal.fire(
          'Actualizado con exito!',
          'Tu usuario ha sido actualizado.',
          'success'
        );
        this.selected = false;
        this.clean();
        this.getTable();
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

  edit() {
    Swal.fire({
      title: 'Actualizar el siguiente usuario?',
      text: this.selectedUser,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        this.updateUser();
      }
    })
  }

  getTable() {
    // Actualizar la tabla
    this.crudService.GetUsers().subscribe((res: []) => {
      if(res.length) {
        this.users = res;
      }
    });
    this.changeDetectorRefs.detectChanges();
  }

  remove(User) {
    Swal.fire({
      title: 'Eliminar el siguiente usuario?',
      text: User.firstname + " " + User.lastname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        this.crudService.DeleteUser(User.email).subscribe((res:[]) => {
          if(res.length != 0) {
            Swal.fire(
              'Eliminado con exito!',
              'Tu usuario ha sido eliminado.',
              'success'
            );
            this.getTable();
          }
        })
      }
    })
  }

  makeUser() { 
    this.fixBirthdate();
    this.crudService.InsertUser(this.firstname, this.lastname, this.password,this.tel,this.genre,this.email,this.birthdate,this.type,"1")
    .subscribe((res: []) => {
      //console.log(res);
      if(res['status']){
        Swal.fire(
          'Creado con exito!',
          'Tu usuario ha sido creado.',
          'success'
        );
        this.getTable();
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

  regUser()
  {
    Swal.fire({
      title: 'Crear el siguiente usuario?',
      text: this.firstname + " " + this.lastname,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
        this.makeUser();
      }
    })
  } 

}
