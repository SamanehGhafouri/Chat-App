import { Component } from '@angular/core';
import {UserTrackingService} from "@angular/fire/analytics";
import {UserService} from "./Services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService:UserService, private router:Router) {
  //   console.log("This is username ",userService.username);
  //   if(userService.username == ''){
  //     router.navigate(['/login'])
  //   }
  //   else {
  //     router.navigate(['/roomlist'])
  //   }
  }
}
