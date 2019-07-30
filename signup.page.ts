import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
// import { Http,Response } from '@angular/http';
// import { Headers } from '@angular/http'; 
import {RequestOptions ,Request, RequestMethod} from '@angular/http';

declare const $;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  // @ViewChild("form")
  @ViewChild('form', {static: false}) Component
  form: NgForm;
  email: any[];
  password: any[];
  first_name: any[];
  last_name: any[];
  contact_no: any[];
  role: any[];
  /*value: any
  private url = 'https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles/';
  */
  constructor(private http: HttpClient ,private router:Router,) { }
  
  onSubmit( password:string,email:string, first_name:string, last_name:string, contact_no:number, role:string ){ /**/ 
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //     })
    //   };
    let headers=new Headers({ 'Content-Type': 'application/json'}); 
         let options = new RequestOptions({ headers: Headers });
        // const data = JSON.stringify(null);
        
        console.log(this.form.value.password);
         console.log(this.form.value.email);
         console.log(this.form.value.first_name);
         console.log(this.form.value.last_name);
         console.log(this.form.value.contact);
         console.log(this.form.value.role);
         console.log(this.form.value.address);
        //  const data = JSON.stringify(null);
        
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

  Goback= function () {                    /*function to go for login page*/
    this.router.navigateByUrl('/login-page');
};

}


  
/* onSubmit(){
  console.log(this.form.value);
  this.httpClient.post('http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/security/api/signup',
  this.form.value).subscribe();
}*/

    /* 
  
  onSubmit(form: NgForm){
    var data = form.value;
    console.log(data);
    let headers=new Headers({ 'Content-Type': 'application/json'}); 
         let options = new RequestOptions({ headers: headers });
         var myPostObject = {
          userName:'username',
          firstName:'firstname',
          lastName:'lastname',
          contact:'contact',
          role:'role',
          email:'email',
          passWord:'password',
        }
    this.http.post(this.url, myPostObject)
      .subscribe(response => {
        
        console.log(response);
      },(err: HttpErrorResponse) => {
        console.log(err);
    });
  }
}
  /*get(username,firstname,lastname,contact,role,email,password)
  {
  
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    var url = "http://ec2-13-233-254-150.ap-south-1.compute.amazonaws.com/catalog/api/products_load/1";
  
    return this.http
      .get(url, {headers:headers})
      .toPromise()
      .then((res)=> res.json())
  
  }
  
  }
  
  /*
    get(url:string) {
      return this.http.get(url)
          .map(data => {
              data.json();
              // the console.log(...) line prevents your code from working 
              // either remove it or add the line below (return ...)
              console.log("I CAN SEE DATA HERE: ", data.json());
              return data.json();
      });*/


 