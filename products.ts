import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { place } from '../../app/place.model';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  // loadedPlaces: place[];
  items: place[];
  productSub: any;
  
  // private productSub: Subscription;

  constructor(
    private productService: ProductProvider,
  
   
  ) {}

  ngOnInit() {
    console.log("init function start");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {
      console.log("init function subscribe");
     // console.log(productel);
      this.items = productel;
      console.log(this.items);
      
    });
  }

  ionViewWillEnter() {
  //where is the code inside this subscribe to add to items
    this.productService.fetchPlaces().subscribe(() => {
     
    });
  }
}




