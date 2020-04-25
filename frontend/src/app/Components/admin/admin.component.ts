import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedFile: File;

  constructor(private papa: Papa) { }

  ngOnInit(): void {
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
          var res = [];
          for(var i = 1; i<result.data.length; i++) {
            var item = {};
            item['id'] = result.data[i][0];
            item['url'] = result.data[i][1];
            item['desc'] = result.data[i][2];
            item['cat'] = result.data[i][3];
            item['price'] = result.data[i][4];
            item['cant'] = result.data[i][5];
            item['colors'] = result.data[i][6];   
            res.push(item);
          }
          console.log(res);
        }
      });
    }
  }

}
