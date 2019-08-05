import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';

// [
//   new Place(
//     'p1',
//     'Manhattan Mansion',
//     'In the heart of New York City.',
//     'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
//     149.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p2',
//     "L'Amour Toujours",
//     'A romantic place in Paris!',
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
//     189.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p3',
//     'The Foggy Palace',
//     'Not your average city trip!',
//     'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
//     99.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   )
// ]

interface PlaceData {                                  /*interface will help to arrange the arguments and can use those arg anywhere in the class  */
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);     /*behavious sub is a observable it will will return subscribe value if functun return nothing*/

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http                                     /*retrives the data from */
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-project-49656.firebaseio.com/offered-places.json'
      )
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {          /*hasownproperty specifies wheather it specifies its own property */
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              );
              console.log(this.places)
            }
          }
          return places;
          // return [];
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    return this.http
      .get<PlaceData>(
        `https://ionic-project-49656.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
        })
      );
  }

  addPlace(                      /*adding a places function*/
    title: string,
    description: string,
    price: number,             /*values allotted */
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;         /*let is like a var , that holds a limited block of values*/
    const newPlace = new Place(      /*let and const are same but const cannot change its values once submitted */
      Math.random().toString(),          /*math.random is used to generate floating values,  */
      title,                    /*.tostring along with math.ro=andom coverts numeric to string value */
      description,
      // 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      'data:image/jpeg;base64,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',
      price,
      dateFrom,
      dateTo,
      this.authService.userId   /*new place will create on the perticular userId */
    );
     return this.http                /*doubt: return doesnt given any error */
      .post<{ name: string }>(
        'https://ionic-project-49656.firebaseio.com/offered-places.json',
        {
          ...newPlace,                 /*post values into a json format */ /*doubt */
          id: null               /*before submitting a form it holds id as null */
        }
      )
      .pipe(        /*pipe is used to transform a value*/          /*is a method combines a functional operator */
        switchMap(resData => {  /*after cancelling values new observable will create to subscribe*/ /*when pre proposed events are their then switch map is used or to send something through url then switchmap will be used */
          generatedId = resData.name; /* */
          return this.places; /*whatever result is provided by api should be provide in this.place */
        }),
        take(1),
        tap(places => {                                /*tap is used to debug values and return observables*/
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(places => {
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {         /*updates a plcae*/
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),                                  /*helps to take one value to and observable and unsubscribers*/
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-project-49656.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {                                   /*tap will seek for function and returns observables if no errors */
        this._places.next(updatedPlaces);
      })
    );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, of } from 'rxjs';
// import { take, map, tap, delay, switchMap } from 'rxjs/operators';

// import { Place } from './place.model';
// import { AuthService } from '../auth/auth.service';


// // [
// //   new Place(
// //     'p1',
// //     'Manhattan Mansion',
// //     'In the heart of New York City.',
// //     'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// //     149.99,
// //     new Date('2019-01-01'),
// //     new Date('2019-12-31'),
// //     'abc'
// //   ),
// //   new Place(
// //     'p2',
// //     "L'Amour Toujours",
// //     'A romantic place in Paris!',
// //     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
// //     189.99,
// //     new Date('2019-01-01'),
// //     new Date('2019-12-31'),
// //     'abc'
// //   ),
// //   new Place(
// //     'p3',
// //     'The Foggy Palace',
// //     'Not your average city trip!',
// //     'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
// //     99.99,
// //     new Date('2019-01-01'),
// //     new Date('2019-12-31'),
// //     'abc'
// //   )
// // ]

// interface PlaceData {
//   availableFrom: string;
//   availableTo: string;
//   description: string;
//   imageUrl: string;
//   price: number;
//   title: string;
//   userId: string;

// }

// @Injectable({
//   providedIn: 'root'
// })
// export class PlacesService {
//   private _places = new BehaviorSubject<Place[]>([]);

//   get places() {
//     return this._places.asObservable();
//   }

//   constructor(private authService: AuthService, private http: HttpClient) {}

//   fetchPlaces() {
//     return this.http
//       .get<{ [key: string]: PlaceData }>(
//         'https://ionic-angular-course.firebaseio.com/offered-places.json'
//       )
//       .pipe(
//         map(resData => {
//           const places = [];
//           for (const key in resData) {
//             if (resData.hasOwnProperty(key)) {
//               places.push(
//                 new Place(
//                   key,
//                   resData[key].title,
//                   resData[key].description,
//                   resData[key].imageUrl,
//                   resData[key].price,
//                   new Date(resData[key].availableFrom),
//                   new Date(resData[key].availableTo),
//                   resData[key].userId,
                  
//                 )
//               );
//             }
//           }
//           return places;
//           // return [];
//         }),
//         tap(places => {
//           this._places.next(places);
//         })
//       );
//   }

//   getPlace(id: string) {
//     return this.http
//       .get<PlaceData>(
//         `https://ionic-angular-course.firebaseio.com/offered-places/${id}.json`
//       )
//       .pipe(
//         map(placeData => {
//           return new Place(
//             id,
//             placeData.title,
//             placeData.description,
//             placeData.imageUrl,
//             placeData.price,
//             new Date(placeData.availableFrom),
//             new Date(placeData.availableTo),
//             placeData.userId,
            
//           );
//         })
//       );
//   }

//   uploadImage(image: File) {
//     const uploadData = new FormData();
//     uploadData.append('image', image);

//     return this.http.post<{imageUrl: string, imagePath: string}>(
//       'https://us-central1-ionic-angular-course.cloudfunctions.net/storeImage',
//       uploadData
//     );
//   }

//   addPlace(
//     title: string,
//     description: string,
//     price: number,
//     dateFrom: Date,
//     dateTo: Date,
    
//     imageUrl: string
//   ) {
//     let generatedId: string;
//     const newPlace = new Place(
//       Math.random().toString(),
//       title,
//       description,
//       imageUrl,
//       price,
//       dateFrom,
//       dateTo,
//       this.authService.userId,
      
//     );
//     return this.http
//       .post<{ name: string }>(
//         'https://ionic-angular-course.firebaseio.com/offered-places.json',
//         {
//           ...newPlace,
//           id: null
//         }
//       )
//       .pipe(
//         switchMap(resData => {
//           generatedId = resData.name;
//           return this.places;
//         }),
//         take(1),
//         tap(places => {
//           newPlace.id = generatedId;
//           this._places.next(places.concat(newPlace));
//         })
//       );
//     // return this.places.pipe(
//     //   take(1),
//     //   delay(1000),
//     //   tap(places => {
//     //     this._places.next(places.concat(newPlace));
//     //   })
//     // );
//   }

//   updatePlace(placeId: string, title: string, description: string) {
//     let updatedPlaces: Place[];
//     return this.places.pipe(
//       take(1),
//       switchMap(places => {
//         if (!places || places.length <= 0) {
//           return this.fetchPlaces();
//         } else {
//           return of(places);
//         }
//       }),
//       switchMap(places => {
//         const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
//         updatedPlaces = [...places];
//         const oldPlace = updatedPlaces[updatedPlaceIndex];
//         updatedPlaces[updatedPlaceIndex] = new Place(
//           oldPlace.id,
//           title,
//           description,
//           oldPlace.imageUrl,
//           oldPlace.price,
//           oldPlace.availableFrom,
//           oldPlace.availableTo,
//           oldPlace.userId,
          
//         );
//         return this.http.put(
//           `https://ionic-angular-course.firebaseio.com/offered-places/${placeId}.json`,
//           { ...updatedPlaces[updatedPlaceIndex], id: null }
//         );
//       }),
//       tap(() => {
//         this._places.next(updatedPlaces);
//       })
//     );
//   }
// }


// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { BehaviorSubject, of } from 'rxjs';
// // import { take, map, tap, delay, switchMap } from 'rxjs/operators';

// // import { Place } from './place.model';
// // import { AuthService } from '../auth/auth.service';


// // // [
// // //   new Place(
// // //     'p1',
// // //     'Manhattan Mansion',
// // //     'In the heart of New York City.',
// // //     'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// // //     149.99,
// // //     new Date('2019-01-01'),
// // //     new Date('2019-12-31'),
// // //     'abc'
// // //   ),
// // //   new Place(
// // //     'p2',
// // //     "L'Amour Toujours",
// // //     'A romantic place in Paris!',
// // //     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
// // //     189.99,
// // //     new Date('2019-01-01'),
// // //     new Date('2019-12-31'),
// // //     'abc'
// // //   ),
// // //   new Place(
// // //     'p3',
// // //     'The Foggy Palace',
// // //     'Not your average city trip!',
// // //     'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
// // //     99.99,
// // //     new Date('2019-01-01'),
// // //     new Date('2019-12-31'),
// // //     'abc'
// // //   )
// // // ]

// // interface PlaceData {
// //   availableFrom: string;
// //   availableTo: string;
// //   description: string;
// //   imageUrl: string;
// //   price: number;
// //   title: string;
// //   userId: string;
  
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class PlacesService {
// //   private _places = new BehaviorSubject<Place[]>([]);

// //   get places() {
// //     return this._places.asObservable();
// //   }

// //   constructor(private authService: AuthService, private http: HttpClient) {}

// //   fetchPlaces() {
// //     return this.http
// //       .get<{ [key: string]: PlaceData }>(
// //         'https://ionic-angular-course.firebaseio.com/offered-places.json'
// //       )
// //       .pipe(
// //         map(resData => {
// //           const places = [];
// //           for (const key in resData) {
// //             if (resData.hasOwnProperty(key)) {
// //               places.push(
// //                 new Place(
// //                   key,
// //                   resData[key].title,
// //                   resData[key].description,
// //                   resData[key].imageUrl,
// //                   resData[key].price,
// //                   new Date(resData[key].availableFrom),
// //                   new Date(resData[key].availableTo),
// //                   resData[key].userId,
                  
// //                 )
// //               );
// //             }
// //           }
// //           return places;
// //           // return [];
// //         }),
// //         tap(places => {
// //           this._places.next(places);
// //         })
// //       );
// //   }

// //   getPlace(id: string) {
// //     return this.http
// //       .get<PlaceData>(
// //         `https://ionic-angular-course.firebaseio.com/offered-places/${id}.json`
// //       )
// //       .pipe(
// //         map(placeData => {
// //           return new Place(
// //             id,
// //             placeData.title,
// //             placeData.description,
// //             placeData.imageUrl,
// //             placeData.price,
// //             new Date(placeData.availableFrom),
// //             new Date(placeData.availableTo),
// //             placeData.userId,
            
// //           );
// //         })
// //       );
// //   }

// //   uploadImage(image: File) {
// //     const uploadData = new FormData();
// //     uploadData.append('image', image);

// //     return this.http.post<{ imageUrl: string; imagePath: string }>(
// //       'https://us-central1-ionic-angular-course.cloudfunctions.net/storeImage',
// //       uploadData
// //     );
// //   }

// //   addPlace(
// //     title: string,
// //     description: string,
// //     price: number,
// //     dateFrom: Date,
// //     dateTo: Date,
  
// //     imageUrl: string
// //   ) {
// //     let generatedId: string;
// //     let newPlace: Place;
// //     return this.authService.userId.pipe(
// //       take(1),
// //       switchMap(userId => {
// //         if (!userId) {
// //           throw new Error('No user found!');
// //         }
// //         newPlace = new Place(
// //           Math.random().toString(),
// //           title,
// //           description,
// //           imageUrl,
// //           price,
// //           dateFrom,
// //           dateTo,
// //           userId,
          
// //         );
// //         return this.http.post<{ name: string }>(
// //           'https://ionic-angular-course.firebaseio.com/offered-places.json',
// //           {
// //             ...newPlace,
// //             id: null
// //           }
// //         );
// //       }),
// //       switchMap(resData => {
// //         generatedId = resData.name;
// //         return this.places;
// //       }),
// //       take(1),
// //       tap(places => {
// //         newPlace.id = generatedId;
// //         this._places.next(places.concat(newPlace));
// //       })
// //     );
// //     // return this.places.pipe(
// //     //   take(1),
// //     //   delay(1000),
// //     //   tap(places => {
// //     //     this._places.next(places.concat(newPlace));
// //     //   })
// //     // );
// //   }

// //   updatePlace(placeId: string, title: string, description: string) {
// //     let updatedPlaces: Place[];
// //     return this.places.pipe(
// //       take(1),
// //       switchMap(places => {
// //         if (!places || places.length <= 0) {
// //           return this.fetchPlaces();
// //         } else {
// //           return of(places);
// //         }
// //       }),
// //       switchMap(places => {
// //         const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
// //         updatedPlaces = [...places];
// //         const oldPlace = updatedPlaces[updatedPlaceIndex];
// //         updatedPlaces[updatedPlaceIndex] = new Place(
// //           oldPlace.id,
// //           title,
// //           description,
// //           oldPlace.imageUrl,
// //           oldPlace.price,
// //           oldPlace.availableFrom,
// //           oldPlace.availableTo,
// //           oldPlace.userId,
          
// //         );
// //         return this.http.put(
// //           `https://ionic-angular-course.firebaseio.com/offered-places/${placeId}.json`,
// //           { ...updatedPlaces[updatedPlaceIndex], id: null }
// //         );
// //       }),
// //       tap(() => {
// //         this._places.next(updatedPlaces);
// //       })
// //     );
// //   }
// // }


// // // import { Injectable } from '@angular/core';
// // // import { BehaviorSubject, of } from 'rxjs';
// // // import { take, map, tap, delay, switchMap } from 'rxjs/operators';

// // // import { Place } from './place.model';
// // // import { AuthService } from '../auth/auth.service';
// // // import { HttpClient } from '@angular/common/http';
// // // import { User } from '../auth/user.model';


// // // interface PlaceData {
// // //   availableFrom: string;
// // //   availableTo: string;
// // //   description: string;
// // //   imageUrl: string;
// // //   price: number;
// // //   title: string;
// // //   userId: string;
// // // }

// // // @Injectable({
// // //   providedIn: 'root'
// // // })
// // // export class PlacesService {
// // //   private _places = new BehaviorSubject<Place[]>([]);

// // //   get places() {
// // //     return this._places.asObservable();
// // //   }

// // //   constructor(private authService: AuthService, private http: HttpClient) {}

// // //   fetchPlaces() {
// // //     return this.http
// // //       .get<{ [key: string]: PlaceData }>(
// // //         'https://ionic-project-49656.firebaseio.com/offered-places.json'
// // //       )
// // //       .pipe(
// // //         map(resData => {
// // //           const places = [];
// // //           for (const key in resData) {
// // //             if (resData.hasOwnProperty(key)) {
// // //               places.push(
// // //                 new Place(
// // //                   key,
// // //                   resData[key].title,
// // //                   resData[key].description,
// // //                   resData[key].imageUrl,
// // //                   resData[key].price,
// // //                   new Date(resData[key].availableFrom),
// // //                   new Date(resData[key].availableTo),
// // //                   resData[key].userId
// // //                 )
// // //               );
// // //             }
// // //           }
// // //           return places;
// // //           // return [];
// // //         }),
// // //         tap(places => {
// // //           this._places.next(places);
// // //         })
// // //       );
// // //   }

// // //   getPlace(id: string) {
// // //     return this.http
// // //       .get<PlaceData>(
// // //         `https://ionic-project-49656.firebaseio.com/offered-places/${id}.json`
// // //       )
// // //       .pipe(
// // //         map(placeData => {
// // //           return new Place(
// // //             id,
// // //             placeData.title,
// // //             placeData.description,
// // //             placeData.imageUrl,
// // //             placeData.price,
// // //             new Date(placeData.availableFrom),
// // //             new Date(placeData.availableTo),
// // //             placeData.userId
// // //           );
// // //         })
// // //       );
// // //   }

// // //   addPlace(
// // //     title: string,
// // //     description: string,
// // //     price: number,
// // //     dateFrom: Date,
// // //     dateTo: Date
// // //   ) {
// // //     let generatedId: string;
// // //     const newPlace = new Place(
// // //       Math.random().toString(),
// // //       title,
// // //       description,
// // //       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// // //       price,
// // //       dateFrom,
// // //       dateTo,
// // //       UserId,
// // //     );
// // //     return this.http
// // //       .post<{ name: string }>(
// // //         'https://ionic-project-49656.firebaseio.com/offered-places.json',
// // //         {
// // //           ...newPlace,
// // //           id: null
// // //         }
// // //       )
// // //       .pipe(
// // //         switchMap(resData => {
// // //           generatedId = resData.name;
// // //           return this.places;
// // //         }),
        
// // //         take(1),
// // //         tap(places => {
// // //           newPlace.id = generatedId;
// // //           this._places.next(places.concat(newPlace));
// // //         })
// // //       );
// //     // return this.places.pipe(
// //     //   take(1),
// //     //   delay(1000),
// //     //   tap(places => {
// //     //     this._places.next(places.concat(newPlace));
// //     //   })
// //     // );
// // //   }

// // //   updatePlace(placeId: string, title: string, description: string) {
// // //     let updatedPlaces: Place[];
// // //     return this.places.pipe(
// // //       take(1),
// // //       switchMap(places => {
// // //         if (!places || places.length <= 0) {
// // //           return this.fetchPlaces();
// // //         } else {
// // //           return of(places);
// // //         }
// // //       }),
// // //       switchMap(places => {
// // //         const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
// // //         updatedPlaces = [...places];
// // //         const oldPlace = updatedPlaces[updatedPlaceIndex];
// // //         updatedPlaces[updatedPlaceIndex] = new Place(
// // //           oldPlace.id,
// // //           title,
// // //           description,
// // //           oldPlace.imageUrl,
// // //           oldPlace.price,
// // //           oldPlace.availableFrom,
// // //           oldPlace.availableTo,
// // //           oldPlace.userId
// // //         );
// // //         return this.http.put(
// // //           `https://ionic-project-49656.firebaseio.com//offered-places/${placeId}.json`,
// // //           { ...updatedPlaces[updatedPlaceIndex], id: null }
// // //         );
// // //       }),
// // //       tap(() => {
// // //         this._places.next(updatedPlaces);
// // //       })
// // //     );
// // //   }
// // // }
// //   // updatePlace(placeId: string, title: string, description: string) {
// //   //   let updatedPlaces: Place[];
// //   //   return this.places.pipe(
// //   //     take(1),
// //   //     switchMap(places => {
// //   //       if (!places || places.length <= 0) {
// //   //         return this.fetchPlaces();
// //   //       }else {
// //   //         return of(places);
// //   //       }
      
// //   //       const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
// //   //       updatedPlaces = [...places];
// //   //       const oldPlace = updatedPlaces[updatedPlaceIndex];
// //   //       updatedPlaces[updatedPlaceIndex] = new Place(
// //   //         oldPlace.id,
// //   //         title,
// //   //         description,
// //   //         oldPlace.imageUrl,
// //   //         oldPlace.price,
// //   //         oldPlace.availableFrom,
// //   //         oldPlace.availableTo,
// //   //         oldPlace.userId
// //   //       );
// //   //       return this.http.put(
// //   //         `https://ionic-angular-94378.firebaseio.com/offered-places/${placeId}.json`,
// //   //         { ...updatedPlaces[updatedPlaceIndex], id: null }
// //   //       );
// //   //     }),
// //   //     tap(() => {
// //   //       this._places.next(updatedPlaces);
// //   //     })
// //   //   );
// //   // }














// //   // private _places = new BehaviorSubject<Place[]>([]);

// //   // get places() {
// //   //   return this._places.asObservable();
// //   // }

// //   // constructor(private authService: AuthService, private http: HttpClient) {}

// //   // fetchPlaces() {
// //   //   return this.http
// //   //     .get<{ [key: string]: PlaceData }>(
// //   //       'https://ionic-angular-course.firebaseio.com/offered-places.json'
// //   //     )
// //   //     .pipe(
// //   //       map(resData => {
// //   //         const places = [];
// //   //         for (const key in resData) {
// //   //           if (resData.hasOwnProperty(key)) {
// //   //             places.push(
// //   //               new Place(
// //   //                 key,
// //   //                 resData[key].title,
// //   //                 resData[key].description,
// //   //                 resData[key].imageUrl,
// //   //                 resData[key].price,
// //   //                 new Date(resData[key].availableFrom),
// //   //                 new Date(resData[key].availableTo),
// //   //                 resData[key].userId
// //   //               )
// //   //             );
// //   //           }
// //   //         }
// //   //         return places;
// //   //         // return [];
// //   //       }),
// //   //       tap(places => {
// //   //         this._places.next(places);
// //   //       })
// //   //     );
// //   // }


// //   // get places() {
// //   //   return this._places.asObservable();
// //   // }

// //   // constructor(private authService: AuthService, private http: HttpClient) {}

// //   // fetchPlaces() {
// //   //   return this.http
// //   //     .get<{ [key: string]: PlaceData }>(
// //   //       'https://ionic-angular-course.firebaseio.com/offered-places.json'
// //   //     )
// //   //     .pipe(
// //   //       map(resData => {
// //   //         const places = [];
// //   //         for (const key in resData) {
// //   //           if (resData.hasOwnProperty(key)) {
// //   //             places.push(
// //   //               new Place(
// //   //                 key,
// //   //                 resData[key].title,
// //   //                 resData[key].description,
// //   //                 resData[key].imageUrl,
// //   //                 resData[key].price,
// //   //                 new Date(resData[key].availableFrom),
// //   //                 new Date(resData[key].availableTo),
// //   //                 resData[key].userId
// //   //               )
// //   //             );
// //   //           }
// //   //         }
// //   //         return places;
// //   //         // return [];
// //   //       }),
// //   //       tap(places => {
// //   //         this._places.next(places);
// //   //       })
// //   //     );
// //   // }

// //       // .pipe(
// //       //   map(resData => {
// //       //     const places = [];
// //       //     for (const key in resData) {
// //       //       if (resData.hasOwnProperty(key)) {
// //       //         places.push(
// //       //           new Place(
// //       //             key,
// //       //             resData[key].title,
// //       //             resData[key].description,
// //       //             resData[key].imageUrl,
// //       //             resData[key].price,
// //       //             new Date(resData[key].availableFrom),
// //       //             new Date(resData[key].availableTo),
// //       //             resData[key].userId
// //       //           )
// //       //         );
// //       //       }
// //       //     }
// //       //     return places;
// //       //     // return [];
// //       //   }),
// //       //   tap(places => {
// //       //     this._places.next(places);
// //       //   })
// //       // );
  

// // //   getPlace(id: string) {
// // //     return this.places.pipe(
// // //       take(1),
// // //       map(places => {
// // //         return { ...places.find(p => p.id === id) };
// // //       })
// // //     );
// // //   }

// // //   addPlace(
// // //     title: string,
// // //     description: string,
// // //     price: number,
// // //     dateFrom: Date,
// // //     dateTo: Date
// // //   ) {
// // //     let generatedId: string;
// // //     const newPlace = new Place(
// // //       Math.random().toString(),
// // //       title,
// // //       description,
// // //       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// // //       price,
// // //       dateFrom,
// // //       dateTo,
// // //       this.authService.userId
// // //     );
// // //     return this.http
// // //       .post<{name: string}>(
// // //         'https://ionic-angular-94378.firebaseio.com/offered-places.json',
// // //         {
// // //           ...newPlace,
// // //           id: null
// // //         }
// // //       )
// // //       .pipe(
// // //         switchMap(resData=> {
// // //           generatedId= resData.name;
// // //           return this.places;
// // //         }),
// // //         take(1),
// // //         tap(places=> {
// // //           newPlace.id=generatedId;
// // //           this._places.next(places.concat(newPlace));
// // //             })
      
// // //       );
    
// // //     // return this.places.pipe(
// // //     //   take(1),
// // //     //   delay(1000),
// // //     //   tap(places => {
// // //     //     this._places.next(places.concat(newPlace));
// // //     //   })
// // //     // );
// // //   }

// // //   updatePlace(placeId: string, title: string, description: string) {
// // //     return this.places.pipe(
// // //       take(1),
// // //       delay(1000),
// // //       tap(places => {
// // //         const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
// // //         const updatedPlaces = [...places];
// // //         const oldPlace = updatedPlaces[updatedPlaceIndex];
// // //         updatedPlaces[updatedPlaceIndex] = new Place(
// // //           oldPlace.id,
// // //           title,
// // //           description,
// // //           oldPlace.imageUrl,
// // //           oldPlace.price,
// // //           oldPlace.availableFrom,
// // //           oldPlace.availableTo,
// // //           oldPlace.userId
// // //         );
// // //         this._places.next(updatedPlaces);
// // //       })
// // //     );
// // //   }
 
// // // }












// // // private _places = new BehaviorSubject<Place[]>([
// // //   new Place(
// // //     'p1',
// // //     'Manhattan Mansion',
// // //     'In the heart of New York City.',
// // //     'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// // //     149.99,
// // //     new Date('2019-01-01'),
// // //     new Date('2019-12-31'),
// // //     'xyz'
// // //   ),
// // //   new Place(
// // //     'p2',
// // //     "L'Amour Toujours",
// // //     'A romantic place in Paris!',
// // //     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
// // //     189.99,
// // //     new Date('2019-01-01'),
// // //     new Date('2019-12-31'),
// // //     'abc'
// // //   ),
// // //   new Place(
// // //     'p3',
// // //     'The Foggy Palace',
// // //     'Not your average city trip!',
// // //     'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
// // //     99.99,
// // //     new Date('2019-01-01'),
// // //     new Date('2019-12-31'),
// // //     'abc'
// // //   )
// // // ]);


// // // import { Injectable } from '@angular/core';
// // // import{take, map} from 'rxjs/operators'
// // // import { Place } from './place.model';
// // // import { AuthService } from '../auth/auth.service';
// // // import {  HttpClient } from '@angular/common/http';
// // // import { BehaviorSubject } from 'rxjs';



// // // @Injectable({
// // //   providedIn: 'root'
// // // })
// // // export class PlacesService {
// // //   private _places = new BehaviorSubject<Place[]>([
// // //     new Place(
// // //       'p1',
// // //       'Manhattan Mansion',
// // //       'In the heart of New York City.',
// // //       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// // //       149.99,
// // //       new Date('2019-01-01'),
// // //       new Date('2019-12-31'),
// // //       'abc'
// // //     ),
// // //     new Place(
// // //       'p2',
// // //       "L'Amour Toujours",
// // //       'A romantic place in Paris!',
// // //       'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
// // //       189.99,
// // //       new Date('2019-01-01'),
// // //       new Date('2019-12-31'),
// // //       'abc'
// // //     ),
// // //     new Place(
// // //       'p3',
// // //       'The Foggy Palace',
// // //       'Not your average city trip!',
// // //       'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
// // //       99.99,
// // //       new Date('2019-01-01'),
// // //       new Date('2019-12-31'),
// // //       'abc'
// // //     )
// // //   ]);
// // //   get places() {
// // //     return this._places.asObservable();
// // //   }


// // //   constructor(private authService: AuthService, private http:HttpClient) {}

// // //   getPlace(id: string) {
// // //     return this.places.pipe(take(1), map(places=> {
// // //       return { ...places.find(p => p.id === id)};
// // //     }));
   
// // //   }


// // //   addPlace(
// // //     title: string,
// // //     description: string,
// // //     price: number,
// // //     dateFrom: Date,
// // //     dateTo: Date
// // //   ) {
// // //     const newPlace = new Place(
// // //       Math.random().toString(),
// // //       title,
// // //       description,
// // //       'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
// // //       price,
// // //       dateFrom,
// // //       dateTo,
// // //       this.authService.userId
// // //     );
// // //     this.places.pipe(take(1)).subscribe(places=>{
// // //       this._places.next(places.concat(newPlace));
// // //     });

    
// // // }





// // // }




