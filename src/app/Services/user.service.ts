import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: string;

  constructor() {
    // local storage
    this.username = '';
  }
  logout(){
    this.username = '';
  }
}
