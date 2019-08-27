import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { place } from '../../app/place.model';

/**
 * Generated class for the BrandDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand-details',
  templateUrl: 'brand-details.html',
})
export class BrandDetailsPage {
  productSub: any;
  items: place[];
  newBrand: Array<any> = [];
  newweight: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  output: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private productService: ProductProvider,) {
  }

  ionViewDidLoad() {
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init",productel);
    // console.log('ionViewDidLoad BrandDetailsPage');
  })

}

ngOnInit() {
  console.log("init function start");
  this.productSub = this.productService.fetchPlaces().subscribe(productel => {
    console.log("init function subscribe");
  
    this.items = productel;
    console.log(this.items);
    this.newfunction();
    // this.items.sort((a,b) => 0 - (a > b ? -1 : 1));
    // this.items.sort((a,b) => 0 - (a > b ? 1 : -1));
   
  //  for(var i=0; i<this.items.length; i++)
  //  {
  //   //  console.log("newbrand",this.items[i].brand);
  //    this.newBrand.push(this.items[i].brand);
  //    console.log("newarraybrand is",this.items[i].brand);
  //    var sortedArray: string[] = this.newBrand.sort((n1,n2) => {
  //     if (n1 > n2) {
  //         return 1;
  //     }
  
  //     if (n1 < n2) {
  //         return -1;
  //     }
  
  //     return 0;
  // });
  // console.log("sort",sortedArray);
  
  //  }

  });
  
}
newfunction()
{
  for(var i=0; i<this.items.length; i++)
  {
   //  console.log("newbrand",this.items[i].brand);
    this.newBrand.push(this.items[i].brand);
    if(this.items[i].brand in this.newBrand)
    {
      return this.newBrand;
    }
    console.log(this.newBrand);
    
    var temparray = [];
for( i=0; i<this.items.length; i++) {
    if( temparray[this.items[i].brand]) continue;
    temparray[this.items[i].brand] = true;
    this.output.push(this.items[i].brand);
}
console.log("output",this.output);
  
    



  //   console.log("newarraybrand is",this.items[i].brand);
  //    this.sortedArray = this.newBrand.sort((n1,n2) => {
  //    if (n1 > n2) {
  //        return 1;
  //    }
 
  //    if (n1 < n2) {
  //        return -1;
  //    }
 
  //    return 0;
 
    
  //   });
    
 
  // }
  // console.log("sort",this.sortedArray);
}
}

// newWeight()
// {
//   for(var i=0; i<this.items.length; i++)
//   {
   //  console.log("newbrand",this.items[i].brand);
    // this.newBrand.push(this.items[i].weight);
    
    // console.log("newarraybrand is",this.items[i].weight);
    // this.sortedArray2 = this.newweight.sort((n1,n2) => {
    //  if (n1 > n2) {
    //      return 1;
    //  }
 
    //  if (n1 < n2) {
    //      return -1;
    //  }
 
    //  return 0;
 
    
    // });
    
 
//   }
//   console.log("sortweight",this.sortedArray2);
// }


// }

}