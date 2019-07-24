import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _UserIsAuthenticated = false;

  get UserIsAuthenticated()
  {
return this._UserIsAuthenticated;
  }

  constructor() { }

  login()
  {
    this._UserIsAuthenticated=true;
  }
  logout()
  {
    this._UserIsAuthenticated=false;
  }
}
