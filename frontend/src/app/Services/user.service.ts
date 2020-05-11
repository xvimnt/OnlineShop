import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  //TODO: GET USERS
  GetUsers() {
    const url = "http://localhost:3000/getUsers";
    return this.http.get(url);
  }

  //TODO: CONFIRM USER
  sendEmailConf(firstname: string, lastname: string, email: string ) {
    const url = "http://localhost:3000/sendConfirm"
    return this.http.post(
      url,
      {
        firstname,
        lastname,
        email
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
  //TODO: INSERT USERS
  InsertUser(firstname: string, lastname: string, password: string, tel: string, genre: string,email: string, birthdate:string, type:string, disp:string) {
    const url = "http://localhost:3000/addUser"
    return this.http.post(
      url,
      {
        firstname,
        lastname,
        password,
        tel,
        genre,
        email,
        birthdate,
        type,
        disp
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  //TODO:GET USER
  getUser(email: string, password: string)
  {
    const url = "http://localhost:3000/getUser"
    return this.http.post(
      url,
      {
        "password": password,
        "email": email
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  //TODO:UPDATE USER
  UpdateUser(firstname: string, lastname: string, password: string, tel: string, genre: string,email: string, birthdate:string, type:string, selected: string) {
    const url = "http://localhost:3000/updateUser";

    return this.http.put(
      url,
      {
        firstname,
        lastname,
        password,
        tel,
        genre,
        email,
        birthdate,
        type, 
        selected
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  //TODO: DELETE USER
  DeleteUser(email) {
    const url = "http://localhost:3000/deleteUser/" + email;
    return this.http.delete(url).pipe(map(data => data));
  }


  //TODO: LOGIN
  Login(username) {
    const url = "http://localhost:3000/signUp";

    return this.http.post(url,
      {
        "username": username
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  //TODO: SET CURRENT USER
  setCurrentUser(user: []) {
    let user_string = JSON.stringify(user);
    localStorage.setItem('UsuarioLogueado', user_string);
  }
  
  //TODO: GET CURRENT USER
  getCurrentUser() {
    let userCurrent = localStorage.getItem('UsuarioLogueado');
    if (!isNullOrUndefined(userCurrent)) {
      let user_json = JSON.parse(userCurrent);
      return user_json;
    } else {
      return null;
    }
  }

  //TODO: LOGOUT
  logout() {
    localStorage.removeItem("UsuarioLogueado");
    this.router.navigate(['/login']);
  }
}