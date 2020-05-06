import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { }
 
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  addRelation( product: string, category: string) {
    // Add the relationship between two instances
    const url = "http://localhost:3000/addProdCat"
    return this.http.post(
      url,
      {
        product,
        category
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }

  //TODO: GET PRODUCTS
  GetProducts() {
    const url = "http://localhost:3000/getProducts";
    return this.http.get(url);
  }


  InsertProduct( description: string, id:Number, url:string, price:Number, cant:Number, colors:string, idate:string) {
    const URL = "http://localhost:3000/addProduct"
    return this.http.post(
      URL, 
      {
        description,
        "id": +id,
        url,
        "price": +price,
        "cant": +cant,
        colors,
        idate,
        'email': 'matrixjv98@hotmail.com'
      },
      { headers: this.headers }
    ).pipe(map(data => data));
  }
}
