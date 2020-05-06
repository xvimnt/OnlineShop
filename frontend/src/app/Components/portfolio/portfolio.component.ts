import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../Services/product.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
products: [];

  constructor(public prodService: ProductService) { }

  ngOnInit(): void {
    this.prodService.GetProducts().subscribe((res:[]) => {
      this.products = res;
    });
  }

}
