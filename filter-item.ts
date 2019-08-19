import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FilterItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-item',
  templateUrl: 'filter-item.html',
})
export class FilterItemPage {
  // id:any;
id:string = '';
  found: boolean;
  price: number;
  postsfilter: any[];
  posts: any[];
  // weight: number;
//  chips:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterItemPage');
  }
  

  onNameKeyUp(event:any){
      this.id = event.target.value;
      this.found = false;
    }
    
    
    getProfile(id:any){
      // this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/?variable=chips`)
      // this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/?name=${this.chips}`)
      this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/`+id+'0')
      // this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/' + id + '/3');
      .subscribe(
        (data:any[]) => {
          if(data.length) {
            this.price = data[length].price;
            // return data[length];
            this.found = true;
          }
          
        }
      )
    }
}
