import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import {  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
// declare const $;

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild("form")
  form: NgForm;
  email: any[];
  password: any[];
  first_name: any[];
  last_name: any[];
  contact_no: any[];
  role: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit( password:string,email:string, first_name:string, last_name:string, contact_no:number, role:string ){
    
    let headers=new Headers({ 'Content-Type': 'application/json'}); 
         let options = new RequestOptions({ headers: headers });
         console.log(this.form.value.password);
         console.log(this.form.value.email);
         console.log(this.form.value.first_name);
         console.log(this.form.value.last_name);
         console.log(this.form.value.contact);
         console.log(this.form.value.role);
         console.log(this.form.value.address);

         this.http.post('http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/security/api/signup',
     {
  "password": this.form.value.password,
  "email": this.form.value.email,  
  "first_name": this.form.value.firstname,
  "last_name": this.form.value.lastname,
  "contact_no": this.form.value.contact,
  "role": this.form.value.role,
  "address":this.form.value.address,
      })
    .subscribe(
      (data:any) => {
        console.log(data);
      },(err: HttpErrorResponse) => {
       console.log(err);
    })
  }

}
