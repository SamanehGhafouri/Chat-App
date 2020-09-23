import { Component } from '@angular/core';
import {UserTrackingService} from "@angular/fire/analytics";
import {UserService} from "./Services/user.service";
import {Router} from "@angular/router";
import * as firebase from "firebase";


const config = {
  apiKey: "AIzaSyCV5d_85_gQ4RWh58teltVPtudhuRpW67c",
  databaseURL: "https://roomtochat.firebaseio.com"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService:UserService, private router:Router) {
    firebase.initializeApp(config);
  //   console.log("This is username ",userService.username);
  //   if(userService.username == ''){
  //     router.navigate(['/login'])
  //   }
  //   else {
  //     router.navigate(['/roomlist'])
  //   }
  }
}
