import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.page.html',
  styleUrls: ['./task2.page.scss'],
})
export class Task2Page implements OnInit {
  // public text: string = 'clickme';
  status=true; /*status on button is initialised as true */
  
  // name: string;
  constructor(
    // private navParams: NavParams,
    public alertController: AlertController
    ) { }

  ngOnInit() {
// this.name= this.navParams.data;
// this.name= this.navParams.get('UserName');
  }
  // public changeText(): void {
  //   if(this.text === 'true') { 
  //     this.text = 'false'
  //   } else {
  //     this.text = 'true'
  //   }
  // }
  

 async onSwitchMode() {                       /*switches betweent signin and signup*/
    this.status = !this.status;  /*status holds two states either true or false . it should toggle if true makes false and false makes true */

    // alert('ok');  /*alert just to prompt in localhost */
    const alert = await this.alertController.create({   /*await is used here to reject or to resolve the function */
      header: 'confirm..',  /*alertcontroller holds a dialogbox and it should be used to create a dialog message either to accept or to reject */
      subHeader: 'true/false',  /*subheader is a section in a alert box */
      message: 'Do you want to change state.', /*message is a body of alert box */
      buttons: ['OK']  /*button click provides a alert button to click */
    });
    await alert.present(); /*await will pause function until it should be resolved or reject*/
  }    


}