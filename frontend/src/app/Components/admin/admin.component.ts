import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import {Router} from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { ProductService } from "../../Services/product.service";
import { UserService } from "../../Services/user.service";
import { CategoryService } from "../../Services/category.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedFile: File;

  constructor(private router:Router, public catService:CategoryService, public userService:UserService, public prodService: ProductService, private papa: Papa) { }

  ngOnInit(): void {
    let cuser = this.userService.getCurrentUser();
    //console.log(cuser);
    /*if(cuser == null) {
      this.router.navigate(['/']);
    }
    else {
      if(cuser[0][12] != 'A') {
        this.router.navigate(['forbidden']);
      }
      console.log("usuario logueado clase: ", cuser[0][12]);
    }*/
  }

  timestamp() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // DD-MM-YYYY Format
    return date + "-" + month + "-" + year;

  }

  addHierarchy(catArray: string[]) {
    if(catArray.length > 1) {
      for(var i = 1; i < catArray.length; i++) {
        this.catService.insertHierarchy(catArray[0].trim(), catArray[i].trim())
        .subscribe((res: []) => {
          console.log(res);
        });
      }
    }
  }

  onFileSelected(event)
  {
      this.selectedFile = <File> event.target.files[0];
  }

  onUpload() {
    if(typeof(this.selectedFile) === 'undefined') 
    {
      Swal.fire({
        title: 'Error',
        text: 'No se ha cargado ningun archivo csv',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      })
    }
    else
    {
      const form = new FormData();
      form.append('csv', this.selectedFile, this.selectedFile.name);

      this.papa.parse(this.selectedFile,{
        complete: (result) => {
          // Agregar producto por producto
          for(var i = 1; i<result.data.length; i++) {
            // Insert the categories
            var catArray = result.data[i][3].split('-');
            // Verify the existence of each category
            for(var j = 0; j < catArray.length; j++) {
              // Agregar todas las categorias
              this.catService.InsertCategory(catArray[j].trim(), '').subscribe((res:[]) => {
                console.log(res);
              });
              // Agregar la relacion con los productos
              this.prodService.addRelation(result.data[i][0],catArray[j].trim()).subscribe((res:[]) => {
                console.log(res);
              });
            }
            // Agregar la jeraquia entre ellas
            this.addHierarchy(catArray);
            // Agregar producto a la base de datos
            this.prodService.InsertProduct(result.data[i][2], result.data[i][0],result.data[i][1],
              result.data[i][4], result.data[i][5], result.data[i][6], this.timestamp())
              .subscribe((res: []) => {
                console.log(res);
              });
          }
        }
      });
    }
  }

}
