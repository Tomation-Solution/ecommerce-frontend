import { CategoryServiceService } from './../services/category-service.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allCategories = [];
  constructor(private catService: CategoryServiceService) { }

  ngOnInit(): void {
    $('.category-toggle').on('click', () => {
      $('.category-menu').slideToggle();
    });
    $('.cart-total-price').on('click', () => {
      $('.cart-list').slideToggle();
    });
    $('.mini-cart-btn').on('click', () => {
      $('.cart-list').slideToggle();
    });

    // fetches all categorys
    this.catService.getAllCategories().subscribe(result => {
      this.allCategories = result.data;
    }, err => {});
  }

}
