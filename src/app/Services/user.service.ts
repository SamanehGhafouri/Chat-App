import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: any;
  userId: any;
  roomname: any[];
  roomId: any;

  constructor() {
    // local storage
    this.username = '';
    this.userId = '';
    this.roomname = [];
    this.roomId = '';
  }
  logout(){
    this.username = '';
    this.userId = '';
  }
}
