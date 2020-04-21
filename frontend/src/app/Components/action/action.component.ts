import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToReg()
  {
    this.router.navigate(['registration']);
  }

}
