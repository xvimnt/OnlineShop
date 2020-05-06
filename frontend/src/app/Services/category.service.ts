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

  InsertCategory(name: string, desc: string) {
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

  getCategories() {
    const url = "http://localhost:3000/getCategories";
    return this.http.get(url);
  }

  insertHierarchy(father: string, son: string) {
    const url = "http://localhost:3000/addHierarchy"
    return this.http.post(
      url,
      {
        father,
        son
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  getCategory(name:string) {
    const url = "http://localhost:3000/getCategory"
    return this.http.post(
      url,
      {
        name
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
}
