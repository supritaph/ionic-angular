// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { Observable } from 'rxjs';
import { Http } from '@angular/http';
// import { Http } from '@angular/http';
// import {  map, tap} from 'rxjs/operators';
// import { chips } from '../../app/chips.model';
// import { Http } from '@angular/http';


// interface ProductData {                                  /*interface will help to arrange the arguments and can use those arg anywhere in the class  */
//   id: string,
//      brand: string,
//       category_id:number,
//       code:number,
//       currency: number,
//       description: string,
//       image_url: string,
//       name: string,
//     weight: number,
//       price: number,
//       type: string,
//      veg_non_veg: string,
// uom: string,
// cess: number,
// cgst: number,
// igst: number,
// sgst: number,

// }
@Injectable()
export class SearchItemsProvider {
  baseUrl: string = `http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/`;

  // queryUrl: string = '?search=';
  // queryUrl: string = `${this.search}`;
  
  
    constructor(private http:Http){}
  
    search(terms: Observable<string>) {
      console.log("no error");
      return terms.debounceTime(1000) /**waits until next data takes through for 400 ms */
        .distinctUntilChanged()   /*if user types something and erases then it will take only data whisch is entered */
        .switchMap(term => this.searchEntries(term));  /**switch map takes a multiple entries which we passed in switch entries and uses a results */
    }
  
    searchEntries(term) { 
      console.log(term);
      // console.log("abcd");
      console.log(this.baseUrl);
      
      // var search;  
      return this.http
          .get(this.baseUrl + term)
          // .get(`http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/${search}`)
          .map(res => res.json());
          
          
    }
  }

  // public _products = new BehaviorSubject<chips[]>([]);     /*behavious sub is a observable it will will return subscribe value if functun return nothing*/
  // data: any;
  
  
  // get products() {
  //   return this._products.asObservable();
  // }

  // constructor( private http: HttpClient) {}
 

  // fetchPlaces() {
  //   //console.log("Here");
  //   return this.http.get(
        
  //       'http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/product/name/chips'

  //     )
  //     // this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{
  //     .pipe(
  //       map(resData => {
  //         //console.log(resData);
  //         const productel = [];
  //         for (const s in resData) {
  //           if (resData.hasOwnProperty(s))
  //            {          /*hasownproperty specifies wheather it specifies its own property */
              
  //             var server_Url = "http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com";
  //             var str= server_Url+""+resData[s].image_url ;
  //             var image_url_new= str;
  //             console.log(image_url_new);
              
  //             productel.push(
  //               new chips(
  //                 s,
  //                 resData[s]._id,
  //                 resData[s].brand,
  //                 resData[s].category_id,
  //                 resData[s].code,
  //                 resData[s].currency ,
  //                 resData[s].description,
  //                 // resData[s].image_url,
  //                 image_url_new,
  //                 resData[s].name,
  //                 resData[s].weight ,
  //                 resData[s].price,
  //                 resData[s].type,
  //                 resData[s].veg_non_veg,
  //                 resData[s].uom,
  //                 resData[s].cess,
  //                 resData[s].cgst,
  //                 resData[s].igst,
  //                 resData[s].sgst,
                 
                  
  //                 )
                 
  //             );
  //             //console.log(productel);
  //             // console.log(this.productel)   /*displays response*/
  //           }
  //         }
  //         return productel;  /*return elements*/
  //         // return [];
  //       }),
  //       tap(productel => {   /**accepts another data */
  //         this._products.next(productel);
  //       })
  //     );
  // }
 


