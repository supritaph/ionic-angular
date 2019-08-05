// import enable the functionality that is defined in a script

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { PlacesService } from '../../places.service';  

// holds url of below files
@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
// export helps to available content of a module in another module
// once the constructor is excuited then oninit will be called
export class NewOfferPage implements OnInit {
  form: FormGroup;        /*declared form holds a set of values i.e formgroup */
// constructor is used to initialize a class member and is used to set up dependency injection
  constructor(
    private placesService: PlacesService,
    private router: Router, 
    private loadingCtrl: LoadingController   /*it will give loading sign until loads a page */
  ) {}

// once the execuition starts then ngoninit is a function to execute
// OnInit() {   this will throws a error as ngoninit missing               
ngOnInit() {          /*ngoninit handles any additional initialization task */

  this.form = new FormGroup({                    /*this gives reference for object */
      title: new FormControl(null, {                    /*this is reactive form usage of writing funcntion */
         // updateOn: 'submit',                   /*submit will submit form onece change is done */
         updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',                                    /*  blur: the blur change mode is only updated the from values / validity status after a form control lost the focus. */
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      
      price: new FormControl(null, {
        updateOn: 'blur',                          /*: blur: the blur change mode is only updated the from values / validity status after a form control lost the focus. */
        validators: [Validators.required, Validators.min(1)]  /*it should hold atlease one digit  */
      }),
      dateFrom: new FormControl(null, {          /*set a initial value to a form control we use  */
        updateOn: 'blur',
        validators: [Validators.required]       /* validates the empty value*/
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

//     this.form = new FormGroup({ 
//       title: new FormControl(null,  {validators: [Validators.required]}),
//         description: new FormControl(null, {validators: [Validators.required]}),
//           price: new FormControl(null, {validators: [Validators.required]}),
//       dateFrom: new FormControl(null,  {validators: [Validators.required]}), 
//       dateTo: new FormControl(null, {validators: [Validators.required]}),
//   }, {updateOn:'blur'});
// }

  onCreateOffer() {        /*function to click on check icon */
    if (!this.form.valid) {   /* if above condition validates then it will crete a loading */
      return;
    }
    this.loadingCtrl    /*once the form is submitted then it will throw an loading spinner */
      .create({
        message: 'Creating place...',
        // spinner: 'crescent',      /*this will crete a spinner for duration 2000ms */
        // duration: 2000
      })
      .then(loadingEl => {              /*then will return promises where promises holds some values and it will compute later*/
        loadingEl.present();           /*then return two events success and failure */
        this.placesService                  /*values in placeservices*/
          .addPlace(
            this.form.value.title,            /*holds values from service file */
            this.form.value.description,
            +this.form.value.price,
            new Date(this.form.value.dateFrom),           /*new date holds for todays date */
            new Date(this.form.value.dateTo)
          )
          .subscribe(() => {                  /*without subscribe service will not provide */
            loadingEl.dismiss();
            this.form.reset();                         
            this.router.navigate(['/places/tabs/offers']);   /*navigate to previous page */
          });
      });
  }
}




// // import { Component, OnInit } from '@angular/core';
// // import { FormGroup, FormControl, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';
// // import { LoadingController } from '@ionic/angular';

// // import { PlacesService } from '../../places.service';

// // import { switchMap } from 'rxjs/operators';

// // function base64toBlob(base64Data, contentType) {
// //   contentType = contentType || '';
// //   const sliceSize = 1024;
// //   const byteCharacters = window.atob(base64Data);
// //   const bytesLength = byteCharacters.length;
// //   const slicesCount = Math.ceil(bytesLength / sliceSize);
// //   const byteArrays = new Array(slicesCount);

// //   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
// //     const begin = sliceIndex * sliceSize;
// //     const end = Math.min(begin + sliceSize, bytesLength);

// //     const bytes = new Array(end - begin);
// //     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
// //       bytes[i] = byteCharacters[offset].charCodeAt(0);
// //     }
// //     byteArrays[sliceIndex] = new Uint8Array(bytes);
// //   }
// //   return new Blob(byteArrays, { type: contentType });
// // }

// // @Component({
// //   selector: 'app-new-offer',
// //   templateUrl: './new-offer.page.html',
// //   styleUrls: ['./new-offer.page.scss']
// // })
// // export class NewOfferPage implements OnInit {
// //   form: FormGroup;

// //   constructor(
// //     private placesService: PlacesService,
// //     private router: Router,
// //     private loadingCtrl: LoadingController
// //   ) {}

// //   ngOnInit() {
// //     this.form = new FormGroup({
// //       title: new FormControl(null, {
// //         updateOn: 'blur',
// //         validators: [Validators.required]
// //       }),
// //       description: new FormControl(null, {
// //         updateOn: 'blur',
// //         validators: [Validators.required, Validators.maxLength(180)]
// //       }),
// //       price: new FormControl(null, {
// //         updateOn: 'blur',
// //         validators: [Validators.required, Validators.min(1)]
// //       }),
// //       dateFrom: new FormControl(null, {
// //         updateOn: 'blur',
// //         validators: [Validators.required]
// //       }),
// //       dateTo: new FormControl(null, {
// //         updateOn: 'blur',
// //         validators: [Validators.required]
// //       }),
// //       location: new FormControl(null, { validators: [Validators.required] }),
// //       image: new FormControl(null)
// //     });
// //   }

  

// //   onImagePicked(imageData: string | File) {
// //     let imageFile;
// //     if (typeof imageData === 'string') {
// //       try {
// //         imageFile = base64toBlob(
// //           imageData.replace('data:image/jpeg;base64,', ''),
// //           'image/jpeg'
// //         );
// //       } catch (error) {
// //         console.log(error);
// //         return;
// //       }
// //     } else {
// //       imageFile = imageData;
// //     }
// //     this.form.patchValue({ image: imageFile });
// //   }

// //   onCreateOffer() {
// //     if (!this.form.valid || !this.form.get('image').value) {
// //       return;
// //     }
// //     this.loadingCtrl
// //       .create({
// //         message: 'Creating place...'
// //       })
// //       .then(loadingEl => {
// //         loadingEl.present();
// //         this.placesService
// //           .uploadImage(this.form.get('image').value)
// //           .pipe(
// //             switchMap(uploadRes => {
// //               return this.placesService.addPlace(
// //                 this.form.value.title,
// //                 this.form.value.description,
// //                 +this.form.value.price,
// //                 new Date(this.form.value.dateFrom),
// //                 new Date(this.form.value.dateTo),
// //                 this.form.value.location,
// //                 // uploadRes.imageUrl
// //               );
// //             })
// //           )
// //           .subscribe(() => {
// //             loadingEl.dismiss();
// //             this.form.reset();
// //             this.router.navigate(['/places/tabs/offers']);
// //           });
// //       });
// //   }
// // }


// // // import { Component, OnInit } from '@angular/core';
// // // import { FormGroup, FormControl, Validators } from '@angular/forms';
// // // import { Router } from '@angular/router';
// // // import { LoadingController } from '@ionic/angular';

// // // import { PlacesService } from '../../places.service';


// // // @Component({
// // //   selector: 'app-new-offer',
// // //   templateUrl: './new-offer.page.html',
// // //   styleUrls: ['./new-offer.page.scss']
// // // })
// // // export class NewOfferPage implements OnInit {
// // //   form: FormGroup;
  

// // //   constructor(
// // //     private placesService: PlacesService,
// // //     private router: Router,
// // //     private loadingCtrl: LoadingController
// // //   ) {}

// // //   ngOnInit() {
// // //     this.form = new FormGroup({
// // //       title: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required]
// // //       }),
// // //       description: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required, Validators.maxLength(180)]
// // //       }),
// // //       price: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required, Validators.min(1)]
// // //       }),
// // //       dateFrom: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required]
// // //       }),
// // //       dateTo: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required]
// // //       })
// // //     });
// // //   }

// // //   onCreateOffer() {
    
  
// // //     if (!this.form.valid) {
// // //       return;
// // //     }
// // //     this.loadingCtrl
// // //       .create({
// // //         message: 'Creating place...'
// // //       })
// // //       .then(loadingEl => {
// // //         loadingEl.present();
// // //         this.placesService
// // //           .addPlace(
// // //             this.form.value.title,
// // //             this.form.value.description,
// // //             +this.form.value.price,
// // //             new Date(this.form.value.dateFrom),
// // //             new Date(this.form.value.dateTo)
// // //           )
// // //           .subscribe(() => {
// // //             loadingEl.dismiss();
// // //             this.form.reset();
// // //             this.router.navigate(['/places/tabs/offers']);
// // //           });
// // //       });
// // //   }
// // // }

// // //  import { Component, OnInit } from '@angular/core';
// // // import { FormGroup, FormControl, Validators } from '@angular/forms';
// // // import { LoadingController } from '@ionic/angular';
// // // import { PlacesService } from '../../places.service';

// // // @Component({
// // //   selector: 'app-new-offer',
// // //   templateUrl: './new-offer.page.html',
// // //   styleUrls: ['./new-offer.page.scss']
// // // })
// // // export class NewOfferPage implements OnInit {
// // //   form: FormGroup;

// // //   constructor(private placesService: PlacesService,
    
// // //     private loadingCtrl: LoadingController) {}

// // //   ngOnInit() {
// // //     this.form = new FormGroup({
// // //       title: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required]
// // //       }),
// // //       description: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required, Validators.maxLength(180)]
// // //       }),
// // //       price: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required, Validators.min(1)]
// // //       }),
// // //       dateFrom: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required]
// // //       }),
// // //       dateTo: new FormControl(null, {
// // //         updateOn: 'blur',
// // //         validators: [Validators.required]
// // //       })
// // //     });
// // //   }

// // //   onCreateOffer() {
// //     // if (!this.form.valid) {
// //     //   return;
// //     // }
// //     // this.placesService.addPlace(
// //     //   this.form.value.title,
// //     //   this.form.value.description,
// //     //   +this.form.value.price,
// //     //   new Date(this.form.value.dateFrom),
// //     //   new Date(this.form.value.dateTo)
// //     // );
// //     // this.loadingCtrl
// //     //   .create({
// //     //     message: 'Creating place...'
// //     //   })
// //     //   .then(loadingEl => {
// //     //     loadingEl.present();
// //     //     this.placesService
// //     //       .addPlace(
// //     //         this.form.value.title,
// //     //         this.form.value.description,
// //     //         +this.form.value.price,
// //     //         new Date(this.form.value.dateFrom),
// //     //         new Date(this.form.value.dateTo)
// //     //       ))
      
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoadingController } from '@ionic/angular';

// import { PlacesService } from '../../places.service';

// import { switchMap } from 'rxjs/operators';

// function base64toBlob(base64Data, contentType) {
//   contentType = contentType || '';
//   const sliceSize = 1024;
//   const byteCharacters = window.atob(base64Data);
//   const bytesLength = byteCharacters.length;
//   const slicesCount = Math.ceil(bytesLength / sliceSize);
//   const byteArrays = new Array(slicesCount);

//   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     const begin = sliceIndex * sliceSize;
//     const end = Math.min(begin + sliceSize, bytesLength);

//     const bytes = new Array(end - begin);
//     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   return new Blob(byteArrays, { type: contentType });
// }

// @Component({
//   selector: 'app-new-offer',
//   templateUrl: './new-offer.page.html',
//   styleUrls: ['./new-offer.page.scss']
// })
// export class NewOfferPage implements OnInit {
//   form: FormGroup;

//   constructor(
//     private placesService: PlacesService,
//     private router: Router,
//     private loadingCtrl: LoadingController
//   ) {}

//   ngOnInit() {
//     this.form = new FormGroup({
//       title: new FormControl(null, {
//         updateOn: 'blur',
//         validators: [Validators.required]
//       }),
//       description: new FormControl(null, {
//         updateOn: 'blur',
//         validators: [Validators.required, Validators.maxLength(180)]
//       }),
//       price: new FormControl(null, {
//         updateOn: 'blur',
//         validators: [Validators.required, Validators.min(1)]
//       }),
//       dateFrom: new FormControl(null, {
//         updateOn: 'blur',
//         validators: [Validators.required]
//       }),
//       dateTo: new FormControl(null, {
//         updateOn: 'blur',
//         validators: [Validators.required]
//       }),
//       location: new FormControl(null, { validators: [Validators.required] }),
//       image: new FormControl(null)
//     });
//   }

  

//   onImagePicked(imageData: string | File) {
//     let imageFile;
//     if (typeof imageData === 'string') {
//       try {
//         imageFile = base64toBlob(
//           imageData.replace('data:image/jpeg;base64,', ''),
//           'image/jpeg'
//         );
//       } catch (error) {
//         console.log(error);
//         return;
//       }
//     } else {
//       imageFile = imageData;
//     }
//     this.form.patchValue({ image: imageFile });
//   }

//   onCreateOffer() {
//     if (!this.form.valid || !this.form.get('image').value) {
//       return;
//     }
//     this.loadingCtrl
//       .create({
//         message: 'Creating place...'
//       })
//       .then(loadingEl => {
//         loadingEl.present();
//         this.placesService
//           .uploadImage(this.form.get('image').value)
//           .pipe(
//             switchMap(uploadRes => {
//               return this.placesService.addPlace(
//                 this.form.value.title,
//                 this.form.value.description,
//                 +this.form.value.price,
//                 new Date(this.form.value.dateFrom),
//                 new Date(this.form.value.dateTo),
//                 this.form.value.location,
//                 // uploadRes.imageUrl
//               );
//             })
//           )
//           .subscribe(() => {
//             loadingEl.dismiss();
//             this.form.reset();
//             this.router.navigate(['/places/tabs/offers']);
//           });
//       });
//   }
// }