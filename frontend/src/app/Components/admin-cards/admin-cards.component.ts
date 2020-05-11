import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { QueryService } from "../../Services/query.service";

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit {
 parm: string;
 pari: Number;

  constructor(public queryService: QueryService) { }

  ngOnInit(): void {
    this.parm = "00-00-0000";
  }

  fixBirthdate() {
    let birthArray = this.parm.split('-');
    this.parm = "";
    if(birthArray.length > 0) {
     for(var i = birthArray.length - 1; i >= 0; i--) {
       this.parm += birthArray[i];
       if(i >= 1) this.parm += '-';
      } 
    }
  }

  secondReport() {
    this.fixBirthdate();
    this.queryService.getSecondReport(this.parm).subscribe((res:[]) => {
      var doc = new jsPDF();
      var col = ["Nombre", "Email", "Fecha de Nacimiento"];
      var rows = [];
      // Formato de Jspdf
      for(var key in res) {
          var temp = [res[key]['name'],res[key]['email'],res[key]['birthdate']];
          rows.push(temp);
      }
      // Guardando pdf
      autoTable(doc, { columns: col, body: rows });
      doc.save('segundo.pdf');
    })
  }

  thirdReport() {
    this.fixBirthdate();
    this.queryService.getThirdReport(this.parm).subscribe((res:[]) => {
      var doc = new jsPDF();
      var col = ["Nombre", "Email", "Genero", "Fecha de Nacimiento"];
      var rows = [];
      // Formato de Jspdf
      for(var key in res) {
          var temp = [res[key]['name'],res[key]['email'], res[key]['genre'], res[key]['birthdate']];
          rows.push(temp);
      }
      // Guardando pdf
      autoTable(doc, { columns: col, body: rows });
      doc.save('tercero.pdf');
    })
  }

  tenthReport() {
    this.queryService.getTenthReport(this.pari).subscribe((res:[]) => {
      var doc = new jsPDF();
      var col = ["Codigo", "Descripcion", "Cantidad"];
      var rows = [];
      // Formato de Jspdf
      for(var key in res) {
          var temp = [res[key]['id'],res[key]['description'], res[key]['cant']];
          rows.push(temp);
      }
      // Guardando pdf
      autoTable(doc, { columns: col, body: rows });
      doc.save('decimo.pdf');
    })
  }

  createPdf() {
    var item = {
      "Name" : "XYZ",
      "Age" : "22",
      "Gender" : "Male"
    };
    var doc = new jsPDF();
    var col = ["Details", "Values"];
    var rows = [];

    for(var key in item){
        var temp = [key, item[key]];
        rows.push(temp);
    }

    autoTable(doc, { columns: col, body: rows });

    doc.save('Test.pdf');
  }

}
