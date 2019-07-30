import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  

  OnLogin= function () {                /*function to go for login page*/
          this.router.navigateByUrl('/login-page');            /*router will help to navigate url to next page*/
  };


  Onregister= function () {                    /*function to go for login page*/
    this.router.navigateByUrl('/signup');
};

}
