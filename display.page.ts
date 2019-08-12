import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { place } from '../place.model';


@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
  
  // loadedPlaces: place[];
  items: place[];
  productSub: any;
  
  // private productSub: Subscription;

  constructor(
    private productService:ProductService,
  
   
  ) {}

  ngOnInit() {
    this.productSub = this.productService._products.subscribe(productel => {
      this.items = productel;
      
    });
  }

  ionViewWillEnter() {
  
    this.productService.fetchPlaces().subscribe(() => {
     
    });
  }

  
}

