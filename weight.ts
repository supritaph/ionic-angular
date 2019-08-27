import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { place } from '../../app/place.model';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the WeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {
  productSub: any;
  items: place[];
  
  newweight: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  output: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private productService: ProductProvider,) {
  }
  ngOnInit() {
    console.log("init function start");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {
      console.log("init function subscribe");
    
      this.items = productel;
      console.log(this.items);
      this.newWeight();
     
    });
    
  }

  ionViewDidLoad()  {
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init",productel);
    // console.log('ionViewDidLoad BrandDetailsPage');
  })

}
  newWeight()
{
  for(var i=0; i<this.items.length; i++)
  {
    console.log("newweight",this.items[i].weight);
    this.newweight.push(this.items[i].weight);
    
    console.log("newarraybrand is",this.items[i].weight);
  //   this.sortedArray2 = this.newweight.sort((n1,n2) => {
  //    if (n1 > n2) {
  //        return 1;
  //    }
 
  //    if (n1 < n2) {
  //        return -1;
  //    }
 
  //    return 0;
 
    
  //   });
    
 
  // }
  // console.log("sortweight",this.sortedArray2);

  var temparray = [];
for( i=0; i<this.items.length; i++) {
    if( temparray[this.items[i].weight]) continue;
    temparray[this.items[i].weight] = true;
    this.output.push(this.items[i].weight);
}
console.log("output",this.output);
this.sortedArray2 = this.output.sort((n1,n2) => {
  if (n1 > n2) {
      return 1;
  }

  if (n1 < n2) {
      return -1;
  }

  return 0;

 
 });
 

}
console.log("sortweight",this.sortedArray2);
}



}

  

