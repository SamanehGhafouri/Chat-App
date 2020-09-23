import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../Services/user.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {
  addRoomForm = new FormGroup({
    roomname: new FormControl()
  });
  constructor(private router: Router, private userService:UserService) { }

  addRooms(){
    const name = this.addRoomForm.value.roomname;
    if (name != ''){

      this.userService.roomname = name;
      //Add room in Firebase
      const newRoom = firebase.database().ref('rooms/').push();
      newRoom.set({roomname: name, userId: this.userService.userId, username: this.userService.username});
    }else {
      console.log("room exist");
    }

    this.router.navigate(['roomlist']);
  }

  ngOnInit(): void {
  }

}
