import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../Services/user.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {
  displayname: string;
  displayuserId: string;
  displayroomname: any[];

  constructor(private router: Router, private userService: UserService) {
    this.displayname = userService.username;
    this.displayuserId = userService.userId;
    this.displayroomname = [];
  }

  ngOnInit(): void {

    firebase.database().ref('rooms').orderByChild('roomname').on('value', (resp: any) => {
      this.displayroomname = [];

      // Extract or convert the Firebase response to the array of objects
      resp.forEach((childSnapshot: any) => {
        const item = childSnapshot.val();
        console.log("This is the item");
        console.log(item);
        this.displayroomname.push(item);
      });

    });
  }


  addRoom(){
    this.router.navigate(['/addroom']);


  }


  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);

  }
  getRoomlist(){

  }

}
