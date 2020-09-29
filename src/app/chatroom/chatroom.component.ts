import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../Services/user.service";
import * as firebase from "firebase";


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  roomId: string;
  displayAuthors: Set<any>;
  displayChats: any[];
  curentUsername: any;

  //scroll top
  @ViewChild('chatcontent') private chatcontent: ElementRef;

  chatForm: FormGroup;


  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {
    //route.params is an observable.
    //we can extract the value of the param into a hard value by .subscribe
    route.params.subscribe(params => {
      this.roomId = params['roomId'];
    });

    //Display authors by creating a set
    this.displayAuthors = new Set();

    //Current username
    this.curentUsername = this.userService.username;
  }

  submitChats() {
    if (this.chatForm.invalid) {return}

    const newChat = firebase.database().ref('chats/').push();
    newChat.set({
      author: this.userService.username,
      roomId: this.roomId,
      message: this.chatForm.value.chatmsg,
      timestamp: new Date().getTime()
    });

    //Empty the input field after send
    this.chatForm.controls['chatmsg'].setValue('');
  }

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    //getting chats by roomIds
    firebase.database().ref('chats').orderByChild('roomId')
      .equalTo(this.roomId).on('value', (resp: any) => {
      this.displayChats = [];

      // Extract or convert the Firebase response to the array of objects
      resp.forEach((childSnapshot: any) => {
        const chat = childSnapshot.val();
        chat['displayDate'] = new Date(chat.timestamp).toLocaleString();
        this.displayChats.push(chat);

        //Display authors who are using a specific room
        this.displayAuthors.add(chat.author);
      });
      //sort chat by timestamp
      this.displayChats.sort((chat1, chat2) => chat1.timestamp < chat2.timestamp ? -1 : chat1.timestamp > chat2.timestamp ? 1 : 0)

    });
    //validators
    this.chatForm = new FormGroup({
      chatmsg: new FormControl("", [Validators.required, Validators.minLength(1)])
    });

    //scroll
    this.scrollToBottom();

  }

  //get validator
  get chatmsg() {
    return this.chatForm.get('chatmsg');
  }

  // Scroll to the bottom
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatcontent.nativeElement.scrollTop = this.chatcontent.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  backButton(){
    this.router.navigate(['/roomlist']);
  }

}

