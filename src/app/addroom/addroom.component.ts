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
    addroom: new FormControl()
  });
  constructor(private router: Router, private userService:UserService) { }

  addRooms(){
    const rooms = this.addRoomForm.value.addroom;
    const newRooms = firebase.database().ref('rooms/').push();
    newRooms.set({name: rooms});
    this.router.navigate(['roomlist']);
  }

  ngOnInit(): void {
  }

}
