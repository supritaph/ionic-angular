import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ItemsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itemsearch',
  templateUrl: 'itemsearch.html',
})
export class ItemsearchPage {
  name:string = '';
  age:number;
  found:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }
    // onNameKeyUp(event:any){
    //   this.name = event.target.value;
    //   this.found = false;
    // }
    
    
    // getProfile(){
    //   this.http.get(`https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles/?name=${this.name}`)
    //   .subscribe(
    //     (data:any[]) => {
    //       if(data.length) {
    //         this.age = data[0].age;
    //         this.found = true;
    //       }
    //     }
    //   )
    // }
  

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ItemsearchPage');
  // }

}
