import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../Services/user.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  roomId: string;
  displayAuthor: any;
  displayMessage: any[];
  messageTime: [];
  displayChats: any[];


  chatForm = new FormGroup({
    inputMessage: new FormControl()
  });

  constructor(private router: Router, private userService:UserService, private route: ActivatedRoute) {
    //route.params is an observable.
    //we can extract the value of the param into a hard value by .subscribe
    route.params.subscribe(params => {this.roomId = params['roomId']; });

    //Display authors
    this.displayAuthor = userService.username;

  }

  chats(){
    console.log("what is date?", new Date().getTime());
    const newChat = firebase.database().ref('chats/').push();
    newChat.set({
      author: this.userService.username,
      roomId: this.roomId,
      message: this.chatForm.value.inputMessage,
      timestamp: new Date().getTime()
    });
  }

  logout(){
    this.router.navigate(['/login']);
  }


  ngOnInit() {
    firebase.database().ref('chats').on('value', (resp: any) => {
      this.displayChats = [];

      // Extract or convert the Firebase response to the array of objects
      resp.forEach((childSnapshot: any) => {
        const chat = childSnapshot.val();
        if (chat.roomId == this.roomId){
          chat['displayDate'] = new Date(chat.timestamp).toLocaleString();
          this.displayChats.push(chat);
        }

      });

    });
  }


}

