import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
// name: string='';
// price: number;
// found: boolean;


  id: string;
          // public barcode: number;
          // public brand: string;
          // public category_id:number;
          // public code:number;
          // public currency: number;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private http:HttpClient) {

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  // OnNameKeyUp(event:any)
  // {
  //   this.name =event.target.value;
  //   this.found=false
  // }
  // getProfile()
  // {
  //   this.http.get('http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/products_load/1')
  // .subscribe(
  //   (data:any[])=>{
  //     console.log(data);
  //     if(data.length)
  //     {
  //       this.price=data[0].brand;
  //       this.found =true;

  //     }
  //   }
  // )
  // }


  get_products(){
    this.http.get('http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/products_load/1')
    .subscribe((res)=>{
        console.log(res);
        var sample=JSON.stringify(res);    
        
    });
  }

}
