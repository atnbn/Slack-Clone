import { Component, OnInit, ViewChild } from '@angular/core';
import { deflateRaw } from 'zlib';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  sidebarOpen:boolean;


  constructor() {


   }

  ngOnInit(): void {
  }

}
