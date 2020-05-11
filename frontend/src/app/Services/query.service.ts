import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient, private router: Router) { }

  // Second report
  getSecondReport(bdate: string ) {
    const url = "http://localhost:3000/secondReport"
    return this.http.post(
      url,
      {
        bdate
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  // Third report
  getThirdReport(bdate: string ) {
    const url = "http://localhost:3000/thirdReport"
    return this.http.post(
      url,
      {
        bdate
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  // Thenth report
  getTenthReport(num: Number ) {
    const url = "http://localhost:3000/tenthReport"
    return this.http.post(
      url,
      {
        num
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
}
