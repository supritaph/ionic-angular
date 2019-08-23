import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { place } from '../../app/place.model';
import { not } from '@angular/compiler/src/output/output_ast';
import { range } from 'rxjs/observable/range';
import { min, max } from 'rxjs/operators';


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
  selectedItem: any='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductProvider, ) {
      this.maximumPrice=100, this.minimumPrice=20;
      this.input = [];
    }
    checked(event: any, task: any){
      
      const isChecked = event.checked;
  
      // Here you can include your custom logic
      // to handle what happens when the checkbox
      // is checked or unchecked :)
  
      if(isChecked) {
        console.log(`The task ${task} is checked!`)
         
        if(range>=this.output.price){
        this.output.push(task);
        }
        console.log(this.output)
        // ...
        // ...
      } else {
        console.log(`The task ${task} is unchecked!`)
  
        // ...
        // ...
      }
    }

    // radioGroupChange(event:any)
    // {
    //   this.isChecked = !this.isChecked;
    //     console.log(event);
    //     // this.selectedItem= event.target.value;
        
    // }  

    
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
                  console.log(Math.round(i) +":" +Math.round((i+c))+ ":" +c);
                  this.range.push(Math.round(i) +":" +Math.round((i+c)))
                
                }
                

              })
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
  
    
  

 
