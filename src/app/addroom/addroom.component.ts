import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../Services/user.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {
  addRoomForm: FormGroup;

  constructor(private router: Router, private userService: UserService) {
  }

  addRooms() {
    //validation
    if (this.addRoomForm.invalid) {return}


    const name = this.addRoomForm.value.roomname;
    if (name != '') {
      this.userService.roomname = name;

      const query = firebase.database().ref().child('rooms').orderByChild('roomname').limitToFirst(1).equalTo(name);
      query.once('value', (snap: any) => {

        if (snap.val() === null) {

          //Add room in firebase
          const newRoom = firebase.database().ref('rooms/').push();
          const roomKey = newRoom.key;
          newRoom.set({
            roomname: name,
            userId: this.userService.userId,
            username: this.userService.username,
            roomId: roomKey

          });




        } else {
          // we assume that there is only one object since the query has a limit to 1
          // TODO: we can and should enforce this assumed unique username as a Firebase/Database rule.
          // TODO: Display error message to the user...
          // console.log("ERROR: Room with name already exists!");
          return
        }
        this.router.navigate(['/roomlist']);
      });


    } else {
      console.log('Must provide roomname');
    }

  }

  ngOnInit() {
    //validation
    this.addRoomForm = new FormGroup({
      roomname: new FormControl("", [Validators.required, Validators.minLength(1)])
    });
  }

  //validation
  get roomname() {
    return this.addRoomForm.get('roomname');
  }

  backButton() {

    this.router.navigate(['/roomlist']);

  }

}
