import { Component, OnInit } from '@angular/core';
import { APIs } from '../services/apis';
import { Router } from '@angular/router';
import { APIsModal } from '../services/apis.modal';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(private apis:APIs, private router:Router) { }
  myObj:APIsModal;

  loginValidateFunction(LoginForm){   //here LoginForm is the object type of form
    console.log(LoginForm.value) //here LoginForm.value will contain all form fields in form of json object
    this.apis.postLoginDetails(LoginForm.value).subscribe(    
      data => {  //this data will contain all the content of http response
        if(data.token){ //in this api if in return token is sent then its successful, else "message" is sent
        console.log(data.token)
        this.router.navigateByUrl('/afterlogin');
        }
        else{
          document.getElementById("message").innerHTML=data.error;
           //here if "token" is not present in reponse then its unsuccessful
        }
      }
  );
  }

  Onregister= function () {                    /*function to go for login page*/
    this.router.navigateByUrl('/signup');
};
  ngOnInit() {
  }
}
