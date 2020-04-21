import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numYears = 4;

  constructor() {
    this.setNumYears();
  }

  ngOnInit(): void {
  }

  setNumYears() {
    this.numYears = (new Date()).getFullYear() - 2016;
  }

}
