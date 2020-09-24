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


  // addRooms(){
  //   const name = this.addRoomForm.value.roomname;
  //   if (name != ''){
  //     this.userService.roomname = name;
  //
  //     const query = firebase.database().ref().child('rooms').orderByChild('roomname').limitToFirst(1).equalTo(name)
  //     query.once('value', (snap: any) => {
  //
  //       if (snap.val() === null) {
  //
  //         //Add room in Firebase
  //         const newRoom = firebase.database().ref('rooms/').push();
  //         newRoom.set({roomname: name, userId: this.userService.userId, username: this.userService.username});
  //       } else {
  //         // get uid of user and store it in the user service
  //         snap.forEach((childSnap: any) => {
  //           // we assume that there is only one object since the query has a limit to 1
  //           // TODO: we can and should enforce this assumed unique username as a Firebase/Database rule.
  //           this.userService.userId = childSnap.key;
  //         });
  //       }
  //     }
  //     this.router.navigate(['roomlist']);
  //   }
  // }

  addRooms(){
    const name = this.addRoomForm.value.roomname;
    if (name != ''){
      this.userService.roomname = name;

      const query = firebase.database().ref().child('rooms').orderByChild('roomname').limitToFirst(1).equalTo(name);
      query.once('value', (snap: any) => {

        if (snap.val() === null){

          //Add room in firebase
          const newRoom = firebase.database().ref('rooms/').push();
          newRoom.set({roomname: name, userId: this.userService.userId, username:this.userService.username});
        }
        else {
          // get uid of each rooms
          snap.forEach((childSnap: any) =>{
            // we assume that there is only one object since the query has a limit to 1
            // TODO: we can and should enforce this assumed unique username as a Firebase/Database rule.
            this.userService.roomId = childSnap.key;
          });
        }
        this.router.navigate(['/roomlist']);
      });

    }else {
      console.log('Must provide roomname');
    }

  }


  ngOnInit(): void {
  }

}
