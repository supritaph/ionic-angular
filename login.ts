import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



import {  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

import { ProductsPage } from '../products/products';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild("form")
  form: NgForm;
  email: any[];
  password: any[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onSubmit( password:string,email:string){
    
    let headers=new Headers({ 'Content-Type': 'application/json'}); 
         let options = new RequestOptions({ headers: headers });
         console.log(this.form.value.password);
         console.log(this.form.value.email);
         

         this.http.post('http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/security/api/login',
     {
  "password": this.form.value.password,
  "email": this.form.value.email,  
  
      })
    .subscribe(
      (data:any) => {
        console.log(data);
        
        // localStorage.setItem('token',data.token),
        // localStorage.setItem('email',data.token)
        localStorage.setItem('currentUser', JSON.stringify({ 'email': data.email ,'fullname': data.fullname, 'token': data.token  }));

        this.navCtrl.push(ProductsPage)
      },(err: HttpErrorResponse) => {
       console.log(err);
       
    })
  }

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
  


