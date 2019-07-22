import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { PersonInputComponent } from './person/person-input.component';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent, PersonComponent,PersonInputComponent,
    
   
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
