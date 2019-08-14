import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { BehaviorSubject } from 'rxjs';
import {  map, tap} from 'rxjs/operators';
import { place } from '../../app/place.model';


interface ProductData {                                  /*interface will help to arrange the arguments and can use those arg anywhere in the class  */
  id: string,
    barcode: number,
     brand: string,
      category_id:number,
      code:number,
      currency: number,
     
      description: string,
      image_url: string,
      name: string,
    weight: number,
      price: number,
      type: string,
     veg_non_veg: string,
uom: string,
cess: number,
cgst: number,
igst: number,
sgst: number,
category:string,
userId: string
}
@Injectable()
export class ProductProvider {
  public _products = new BehaviorSubject<place[]>([]);     /*behavious sub is a observable it will will return subscribe value if functun return nothing*/
  
  
  get products() {
    return this._products.asObservable();
  }

  constructor( private http: HttpClient) {}
 

  fetchPlaces() {
    //console.log("Here");
    return this.http.get(
        
        'http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/products_load/3'

      )
      // this.httpClient.get(this.baseUrl + '/products').subscribe((res : any[])=>{
      .pipe(
        map(resData => {
          //console.log(resData);
          const productel = [];
          for (const s in resData) {
            if (resData.hasOwnProperty(s))
             {          /*hasownproperty specifies wheather it specifies its own property */
              
              var server_Url = "http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com";
              var str= server_Url+""+resData[s].image_url ;
              var image_url_new= str;
              console.log(image_url_new);
              
              productel.push(
                new place(
                  s,
                  resData[s]._id,
                  resData[s].barcode,
                  resData[s].brand,
                  resData[s].category_id,
                  resData[s].code,
                  resData[s].currency ,
                  resData[s].description,
                  image_url_new,
                  resData[s].name,
                  resData[s].weight ,
                  resData[s].price,
                  resData[s].type,
                  resData[s].veg_non_veg,
                  resData[s].uom,
                  resData[s].cess,
                  resData[s].cgst,
                  resData[s].igst,
                  resData[s].sgst,
                  resData[s].category,
                  
                  )
                 
              );
              //console.log(productel);
              // console.log(this.productel)   /*displays response*/
            }
          }
          return productel;  /*return elements*/
          // return [];
        }),
        tap(productel => {   /**accepts another data */
          this._products.next(productel);
        })
      );
  }}

