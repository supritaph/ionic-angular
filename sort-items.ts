import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { place } from '../../app/place.model';

import { range } from 'rxjs/observable/range';
import { ProductsPage } from '../products/products';



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
  newBrand: Array<any> = [];
  newweight: Array<any> = [];
  sortedArray: Array<any> = [];
  sortedArray2: Array<any> = [];
  productSub: any;
  items: place[];
  minimumPrice: number;
  maximumPrice: number;
  price: number;
  applyFilterPrice: any;
  input:place[];
  output = [];
  radios=range;
   val:string;
   radioVal:number;
  //  isChecked = false;
  range = [];
  newrange = [];
  selectedItem: any='';
  newArray: Array<any> = [];
  newArray2: Array<any> = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductProvider, ) {
      this.maximumPrice=100, this.minimumPrice=20;
      this.input = [];
    }
    
    checked($event, task){
      console.log("task are",task)
      // task = task.split(':')
      // console.log("task are",task)
     var  steps = ~~Math.log10(task)/2;
      for(var i = 0; i <= steps; i++) {
        this.newrange.push(Math.round(((task /= 100)%1)*100));
        task = Math.trunc(task);
      }
      console.log("new range",this.newrange);
      const maximum = this.newrange.reduce((a, b) => Math.max(a, b));
      ///console.log("max",max);
      const minimum = this.newrange.reduce((a, b) => Math.min(a, b));
      console.log("max1",maximum);
      console.log("min1",minimum);
      console.log("123",this.items[i].price <= maximum && this.items[i].price >= minimum)
      this.minimumPrice = minimum;
      this.maximumPrice = maximum;
      // this.minimumPrice = task[0];
      // this.maximumPrice = task[1];
      

      //This logic should be on apply now

      this.productService.minPrice = this.minimumPrice;
      this.productService.maxPrice = this.maximumPrice;
      for(i=0; i<this.items.length; i++){
        if (this.items[i].price >= minimum && this.items[i].price <= maximum ) {
          this.newArray2.push(this.items[i]);
          console.log("newitems",this.newArray2);
        }
    }
      console.log("newitems",this.newArray2);
           
        
      
      // var digits = (""+task).split("",2);
      // console.log(digits);
      // let splitarray = task.split(",", 2);
      // console.log("abc1",splitarray);
      // this.newrange.push(splitarray);
      // console.log("new", this.newrange);

  
//       var cast = task.toString(1).split('');
// for (var i=0,n=cast.length; i<n; i++){
//     console.log("task",cast[i]);
// }
      // this.newrange.push(task);
      // console.log("newrange", this.newrange)
      // let splitarray = this.newrange.split(" ", 3);
      // console.log("abc1",splitted); 
  

      // let splitted = task.split(" ", 3);
      // console.log("abc1",splitted); 
      // this.newrange.push(splitted);
      // console.log("newrange",this.newrange[0]);

      // const maximum = this.newrange.reduce((a, b) => Math.max(a, b));
      // const minimum = this.newrange.reduce((a, b) => Math.min(a, b));
      
      // console.log("minimum",minimum);
      // console.log("maximum",maximum);

      // const isChecked = event.checked;

      // for (var i = 0; i < this.items.length; i++) {

      //   var ismatch = false; // we haven't found it yet
  
      //   for (var j = 0; j < this.newrange.length; j++) {
  
      //     if (this.items[i].price <= this.newrange[j] || this.items[i].price >= this.newrange[j]) {
           
      //       ismatch = true;
      //       this.items[i].isChecked = true;//  checkbox status true
      //       this.newArray.push(this.items[i]);
      //       break;
      //     }//End if
      //     // if we never find items price in range, the for loop will simply end,
      //     // and ismatch will remain false
      //   }
      //   // add items to newArray only if we didn't find a match.
      //   if (!ismatch) {
      //     this.items[i].isChecked = false;//  checkbox status false
      //     this.newArray.push(this.items[i]);
      //   } //End ifs
      // }
      // console.log(this.newArray);
  // if(this.items.price<=this.range && this.items.price>=this.range)
  // {
  //   this.input.push(this.items.price)
  // }
  // console.log(this.items);      // Here you can include your custom logic
      // to handle what happens when the checkbox
      // is checked or unchecked :)
  
      // if(isChecked) {
      //   console.log(`The task ${task} is checked!`)
      //   //  console.log("output",this.output)
      //   //  console.log("items",this.items)
      //   //  console.log("range",this.range)
      //   // if(range>=this.output.price){
      //   // this.output.push(task);
      //   // }
      //   // console.log(this.output)
      //   // ...
      //   // ...
      // } else {
      //   console.log(`The task ${task} is unchecked!`)
  
      //   // ...
      //   // ...
      // }
    }

    // radioGroupChange(event:any)
    // {
    //   this.isChecked = !this.isChecked;
    //     console.log(event);
    //     // this.selectedItem= event.target.value;
        
    // }  
    onSubmit(){
      this.productService.minPrice = this.minimumPrice;
      this.productService.maxPrice = this.maximumPrice;
      this.navCtrl.push(ProductsPage);

    }

    
  ionViewDidLoad() {
    console.log('ionViewDidLoad SortItemsPage');
  }
  ngOnInit() {
    console.log("init function start");
    this.productSub = this.productService.fetchPlaces().subscribe(productel => {  /*productsub holds a service function of elemments presents */
      console.log("init function subscribe");
    //  console.log(productel);
      this.items = productel;/*hence items refer to elements in place[] */
      console.log(this.items);
//       for(var i=this.items.price; i >=this.minimumPrice && i<=this.maximumPrice; i++)
//       // for (var i = 0,len = this.items.length; i < len; i++) {
               
//         // return place[i];
//         // console.log("place",place[i])
//         console.log("items are",this.items.price);

// })
// //   }
var abcd = [], l = this.items.length;
// var range = [];
for( var i=0; i<l; i++) {
    if( abcd[this.items[i].price]) continue;
    abcd[this.items[i].price] = true;
    this.output.push(this.items[i].price);

                }
                //console.log("unique prices from array")
                //console.log("items are",output);
                //console.log("max and min value from that unique prices")
                const max = this.output.reduce((a, b) => Math.max(a, b));
                ///console.log("max",max);
                const min = this.output.reduce((a, b) => Math.min(a, b));
                //console.log("min", min);
                console.log("displaying index and iteration to bring c values to find range to display")
                var c=(min+max)/10;
                for( i=min; i<max; i=i+c)
                {
                  console.log(Math.round(i)+ ""  +Math.round((i+c))+ "" +c);
                  this.range.push(Math.round(i)+ ""  +Math.round((i+c)))
                  
                
                }

                // const max1 = this.range.reduce((a, b) => Math.max(a, b));
                // console.log("max",max1);
                // const min1 = this.output.reduce((a, b) => Math.min(a, b));
                // console.log("min", min1);
                

              })
              console.log(this.range);
            }

            onNext (eve)
            {
              // for(var i=0;i<range.length; i++)
              // {
              //   this.input.push(this.range.price);
              // }
              console.log(this.range)
//               var result = [];
//               var i;
//     for ( i = this.range; i <= this.range; i++) {
//         result.push(i);
//     }
//     return result;
// };
            }

            newfunction()
            {
              for(var i=0; i<this.items.length; i++)
              {
               //  console.log("newbrand",this.items[i].brand);
                this.newBrand.push(this.items[i].brand);
                console.log("newarraybrand is",this.items[i].brand);
                 this.sortedArray = this.newBrand.sort((n1,n2) => {
                 if (n1 > n2) {
                     return 1;
                 }
             
                 if (n1 < n2) {
                     return -1;
                 }
             
                 return 0;
             
                
                });
                
             
              }
              console.log("sort",this.sortedArray);
            }
            
            newWeight()
            {
              for(var i=0; i<this.items.length; i++)
              {
               //  console.log("newbrand",this.items[i].brand);
                this.newBrand.push(this.items[i].weight);
                console.log("newarraybrand is",this.items[i].weight);
                this.sortedArray2 = this.newweight.sort((n1,n2) => {
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
            
            
            
          
              // if(fieldName===checked)
              // {
              //  console.log(range)  
              // }
              // if(this.items.price>=this.minimumPrice && this.items.price<=this.maximumPrice)
              //                   {
              //                     //  console.log("matched are",this.items[i]);
              //                      this.output.push(this.items);
              //                     //  console.log(this.input)
              //                     //return this.items[i].price;
                                  
              //                   }
              //                   console.log("items are",this.output);
                              
              //                 console.log("items are",this.output);
                            
                            
              //                 }
            // radioGroupChange(evt){
            //   // var target = evt.target;
            //   // if (target.checked) {
               
               
            //   // } else {
            //   //   alert("unchecked")
            //   // }
            // }
        
          
        



              
            

            
















// condition to check unique items and minprice 10 and max price 50 elements
// var abcd = [], output = [], l = this.items.length;
// for( var i=0; i<l; i++) {
//     if( abcd[this.items[i].price] || this.items[i].price>=this.minimumPrice && this.items[i].price<=this.maximumPrice ) continue;
//     abcd[this.items[i].price] = true;
//     output.push(this.items[i].price&& this.items[i].name);

//     // console.log("items are",output);
//     // if(this.items[i].price>=this.minimumPrice && this.items[i].price<=this.maximumPrice)
//     //               {
//     //                 //  console.log("matched are",this.items[i]);
//     //                  output.push(this.items[i]);
//     //                 //  console.log(this.input)
//     //                 //return this.items[i].price;
                    
//     //               }
//     //               console.log("items are",output);
//                 }
//                 console.log("items are",output);
//               });
    
// }
// console.log("output",output)
// for (var i=0, l=this.items.length; i<l; i++)
//         if (this.input.indexOf(this.items[i]) === -1 && this.items[i] !== '')
//             this.input.push(this.items[i]);
//     return this.input;

// condition to check min=10 and max= 50
      // for (var i = 0,len = this.items.length; i < len; i++) {
               
      //               // return place[i];
      //               // console.log("place",place[i])
      //               //console.log("items are",this.items[i].price);
      //               //console.log(this.items[i].price>=this.minimumPrice && this.items[i].price<=this.maximumPrice);
      //               if(this.items[i].price>=this.minimumPrice && this.items[i].price<=this.maximumPrice)
      //               {
      //                 //  console.log("matched are",this.items[i]);
      //                  this.input.push(this.items[i]);
      //                 //  console.log(this.input)
      //                 //return this.items[i].price;
                      
      //               }} 
                 
                
                   
            

      //       //print the array here 
      //       console.log("items are",this.input);
      //       // return this.input[i];
            
      //     })
      //   }

      // for(var i=this.items.price; i >=this.minimumPrice && i<=this.maximumPrice; i++)
      //           {

      //             this.input.push(this.items[i]); ????
      //             console.log(i)
      //           }
      // return this.input;   
      //     });
      //   }

  
//       this.items = productel.filter(product => {
//         console.log("product",product.price);
//         console.log(this.minimumPrice);
//         console.log(this.maximumPrice);
//          product.price >= this.minimumPrice
//           && product.price <= this.maximumPrice
//           for(var i=product.price; i >=this.minimumPrice && i<=this.maximumPrice; i++)
//           {
//             this.input.push(i);
//           }
// return this.input;   
//     });
        
      // if(  product.price >= this.minimumPrice
      //       && product.price <= this.maximumPrice)
      //       {
      //            console.log(product.price)
      //            return product.price;
      //       }
      //       else{
      //         return this.items;
      //       }

            
      // });
  
      
  //     console.log("filter");
  //     console.log(this.items);
  //     console.log(productel);
  //     console.log(this.minimumPrice);
  //     console.log(this.maximumPrice)
  
  
  // }); 
  
  
   
    
      
  

  

    //  this.route.queryParamMap.subscribe(params => 
    //      if(params.get('price') || this.price) {
    //      this.price= params.get('price');
    //      this.applyFilterPrice();
    //    } 
    //  });
  
    
  

 
