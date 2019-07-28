import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _UserIsAuthenticated = false;
  private _userId = 'xyz';

  get UserIsAuthenticated()
  {
return this._UserIsAuthenticated;
  }
  get userId() {
    return this._userId;
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
