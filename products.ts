import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { place } from '../../app/place.model';
import { ProductProvider } from '../../providers/product/product';
import { SortItemsPage } from '../sort-items/sort-items';
import { BrandDetailsPage } from '../brand-details/brand-details';
import { WeightPage } from '../weight/weight';


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
  searchTerm: string ;
  searchElement: string ;
  // filterItems:any;
  // loadedPlaces: place[];
  items: place[];
  productSub: any;
   arrayObj : any;
   objectData : any;
  // filterData = [];
  // private productSub: Subscription;
 
  // searchBoxValue: any;
  arr:any;
  arrayLength: place[];
  //  arrayLength = place.length;

  constructor(
    private productService: ProductProvider,
    public navCtrl: NavController
  
   
  ) {
    this.items = [];
  }


  ngOnInit() {
    console.log("init function start");
    
    // console.log(""+this.filterItem(this.items,this.namekey));
  }

  ionViewWillEnter() {
    console.log("viewEnter");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init function subscribe");
     // console.log(productel);
     this.items = [];
     console.log(this.productService.minPrice);
     console.log(this.productService.maxPrice);
     console.log(productel.length);
     for(var i=0;i<productel.length;i++){
      if (productel[i].price >= this.productService.minPrice && productel[i].price <= this.productService.maxPrice ) {
        this.items.push(productel[i]);
       
      }
     }
     
     // this.items = productel;/*hence items refer to elements in place[] */
      
      console.log(this.items);
      //service file - selected range - ex: 30 to 45
      //search for produucts within 30 to 45 and display
      
    });
    
  }
//   send(){
//     this.items = this.items.sort((n1,n2) => {
//     if (n1 < n2) {
//         return 1;
//     }

//     if (n1 > n2) {
//         return -1;
//     }

//     return 0;
// });
//   }
sort(){
  console.log("hi");
  this.navCtrl.push(SortItemsPage)
  
}
brandname()
{
  this.navCtrl.push(BrandDetailsPage);
}
weight(){
  this.navCtrl.push(WeightPage);
}

  filterItem(){  /*this fun is to search items in an displayed array list */
       
    this.items = this.items.filter(item =>  item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  console.log(this.items);   /*tolowercase fun makes a input in to all low case and returns -1 if not match */
}/*item is array that holds data and filters if name appears and search term holds whatever has been filtered  */
// sort(array:any[],property:string,isNumber:boolean){
//   if(isNumber){
//       return array.sort((item1,item2)=> {
//           return (item1[property] > item2[property]) ? 1 : -1;});
//   }else{
//       return array.sort((item1,item2)=> {
//           return (item1[property].toLowerCase() > item2[property].toLowerCase()) ? 1 : -1;});
//   }
// }

}
//   filterItem() {
//     for (var i = 0,len = this.items.length; i < len; i++) {
//         if ( place[i] === this.arrayLength ) { 
//             // return place[i];
//             console.log(place[i])
//         }
//     }
//     return -1;
// }
// filterItem(namekey: place[]){
//   for (var i=0; i <place.length; i++) {
//       if (place[i] === namekey) {
//           return place[i];
//       }
//       return 0;
//   }
// }
// }
// filterItem(a1: any[], race: any): any {
//   let filteredItems : any[] = new Array();
//   if (race != undefined) {
//     // filter items array, items which match and return true will be kept, false will be filtered out
//       a1.forEach((card)=>
//       {
//           card.forEach((item)=> {
//               let temp= item.racesOrTraits.toLowerCase().includes(race.toLowerCase());
//               if(temp){
//                   filteredItems.push(card);
//               }
//           })

//       })
//    return filteredItems;
// }
// }


/*refer */
// filterItem(namekey,a1){

//   for (let index = 0; index < this.items.length; index++) {
//     this.arrayObj = this.items[index];
//     this.arrayObj.filter((x) => {
//       if (x.name === name) {
//         this.objectData = x;
//       }
//     });
//     console.log('Json Object Data by ID ==> ', this.objectData);
//   }
// };

    // for (var i=0; i <this.items.length; i++) {
    //     if (this.items[i] === namekey) {
    //         return this.items[i];
    //     }
    //     return -1;
    // }


   
  
  // }
//   filterItem(arr)
//   {
//     arr=this.items[name];
//     // this.arr= this.items;
//     for(var i=0; i<arr.length; i++)
//     {
//       if(this.items[name]===arr[name])
//       {
//         return arr[name];
//       }
// return -1;
//     }
//   }


//   filterItem(){
//     for (var i=0,len=this.items.length; i<len; i++){
//       if(this.items[i]===this.searchTerm){
//         return this.items;
//       }
//     }
// return -1;
//   }
// }
//   filterItem(){ /*function */
//     // angular.forEach(this.items, function(item, index) {
//     //   console.log(item, index);
//     // });
//     this.items.forEach(function(items)
//  {
//    if(items.name == 'searchTerm')
//         {
//           alert('Item Exist');
//         }
//  });
//   }
//     }


  //   filterItem(){
       
  //     this.items = this.items.filter(item =>  item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  //   console.log(this.items);
  // }/*item is array that holds data and filters if name appears and search term holds whatever has been filtered  */
  // }
//     filterItem(arr) {
//       for(var i = 0; i < arr.length; i++) {
//           if(this.items == arr[i])
//               return true;
//       }
//       return false;
//   } 
// }
//   filterItem(){ /*function */
//     // angular.forEach(this.items, function(item, index) {
//     //   console.log(item, index);
//     // });
//     for (var i = 0; i < this.items.length; i++) {
//       if (place[i] === 'searchTerm') 
//       {   
//          alert('Value exist');
//          console.log(this.items);
//       }else{
//          alert('Value doesnot exist');
//       }
//     }
//   }
// }
 
//   assignCopy(){
//     this.items = Object.assign([], this.items);
//  }
//  filterItem(value){
//     if(!value){
//         this.assignCopy();
//     } // when nothing has typed
//     this.items = Object.assign([], this.items).filter(
//        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
//     )
//  }
//  this.assignCopy();//when you fetch collection from server.

   
 
  //   this.items = this.items.filter(item =>  item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
  //   console.log(this.items);
  // }/*item is array that holds data and filters if name appears and search term holds whatever has been filtered  */
  // }
 
//   filterItem(value){
//     if(!value){
//         this.assignCopy();
//     } // when nothing has typed
//     this.items = Object.assign([], this.items).filter(
//        item => item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
//     )
//  }
//  this.assignCopy();//when you fetch collection from server.
//   initiazileItems(){
//     this.items= this.items;
//   }
// }
 
  // getItems(ev:any){
  //   this.initiazileItems();
  //   let val = ev.target.value;
  // }
 
  // filterItems(ev: any) {
  //    this.productSub();
     
  //    let val = ev.target.value;
  //    if (val && val.trim() != '') {
  //      this.items = this.items.filter((item) => {
  //        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //      })
  //    }
  //  }

  // searchCountry(searchbar) {
  //   // reset countries list with initial call
  //   this.items = this.filterData;

  //   // set q to the value of the searchbar
  //   var q = searchbar.value;

  //   // if the value is an empty string don't filter the items
  //   if (q.trim() == '') {
  //       return;
  //   }

  //   this.items = this.items.filter((v) => {
  //       if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //           return true;
  //       }
  //       return false;
  //   })

  // setFilteredLocations(){
  //   return this.productService.filterLocations(this.searchTerm);
  // }
  // setFilteredLocations(ev: any){
  //   let val = ev.target.value;

  //   if (val && val.trim() !== '') {
  //     return this.productService.filterLocations(val);
  //   }

  // }

