import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SortItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort-items',
  templateUrl: 'sort-items.html',
})
export class SortItemsPage {
 
  

  constructor(public navCtrl: NavController, public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortItemsPage');
  }
  
  filterItem()
  {
 

  }
  

}
