import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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

}
