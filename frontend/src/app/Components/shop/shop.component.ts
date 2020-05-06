import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from "../../Services/user.service";
import { CategoryService } from "../../Services/category.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: [];
  categories: [];

  constructor( private router:Router, public categoryService: CategoryService, public userService:UserService) { }

  ngOnInit(): void {
    let cuser = this.userService.getCurrentUser();
    //console.log(cuser);          
    if(cuser == null) {
      this.router.navigate(['/']);
    }
    else {
      if(cuser[0][12] != 'U') {
        this.router.navigate(['forbidden']);
      }
      this.categoryService.getCategories().subscribe((res:[]) => {
        this.categories = res;
      });
      console.log("usuario logueado clase: ", cuser[0][12]);
    }
  }

}
