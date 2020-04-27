import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private router: Router) { }
 
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  InsertUser(name: string, desc: string) {
    const url = "http://localhost:3000/addCategory"
    return this.http.post(
      url,
      {
        name,
        desc
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
}
