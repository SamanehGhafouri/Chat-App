import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: any;
  userId: any;

  constructor() {
    // local storage
    this.username = '';
    this.userId = '';
  }
  logout(){
    this.username = '';
    this.userId = '';
  }
}
