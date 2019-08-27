import { Component, Directive, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SearchItemsProvider } from '../../providers/search-items/search-items';
// import { ItemsProvider } from '../../providers/items/items';

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
 
  
  results: Object;
  searchTerm$ = new Subject<string>();  /**subject acts as a observer and observable in the search term */
  

  constructor(private searchItemService:SearchItemsProvider ){
     
  }
  ngOnInit() {  /*we passes a service in our constructor holds all functionality of what search function do */
    this.searchItemService.search(this.searchTerm$)   /* */
      .subscribe(searchdata => { //search data is a local varible within the subscribe method
        this.results = searchdata; //results is a global variable to use in html
        console.log(searchdata);
      });
      
  }
 
}
  // id:any;
// id:string = '';
//   found: boolean;
//   price: number;
//   postsfilter: any[];
//   posts: any[];
  // weight: number;
//  chips:any;

  

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad FilterItemPage');
  // }
  

  // onNameKeyUp(event:any){
  //     this.id = event.target.value;
  //     this.found = false;
  //   }
    
    
    // getProfile(term: string){
    //   // this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/?variable=chips`)
    //   // this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/?name=${this.chips}`)
    //   this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/?term=${term}`)
    //   // this.http.get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/' + id + '/3');
    //   .subscribe(
    //     (data:any[]) => {
    //       if(data.length) {
    //         this.price = data[length].price;
    //         // return data[length];
    //         this.found = true;
    //       }
          
    //     }
    //   )
    // }

