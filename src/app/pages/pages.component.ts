import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  private date = new Date();
  displayDate = this.date.toString().slice(0, 10)

  constructor() { }

  ngOnInit(): void {
  }

}
