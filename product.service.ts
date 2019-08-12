import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable, observable } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import {  place } from './place.model';

// import { place } from './place.model';

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

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public _products = new BehaviorSubject<place[]>([]);     /*behavious sub is a observable it will will return subscribe value if functun return nothing*/
  
  
    get products() {
      return this._products.asObservable();
    }
  
    constructor( private http: HttpClient) {}
   

    fetchPlaces() {
      return this.http                                     /*retrives the data from */
        .get<{ [key: string]: ProductData }>(
          
          'https://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/products_load/1'
  
        )
        .pipe(
          map(resData => {
            const productel = [];
            for (const key in resData) {
              if (resData.hasOwnProperty(key)) {          /*hasownproperty specifies wheather it specifies its own property */
                productel.push(
                  new place(
                    key,
                    resData[key].id,
                    resData[key].barcode,
                    resData[key].brand,
                    resData[key].category_id,
                    resData[key].code,
                    resData[key].currency ,
                    resData[key].description,
                    resData[key].image_url ,
                    resData[key].name,
                    resData[key].weight ,
                    resData[key].price,
                    resData[key].type,
                    resData[key].veg_non_veg,
                    resData[key].uom,
                    resData[key].cess,
                    resData[key].cgst,
                    resData[key].igst,
                    resData[key].sgst,
                    resData[key].category,
                    
                    )
                );
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
  