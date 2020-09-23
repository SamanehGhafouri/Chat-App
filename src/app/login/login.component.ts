import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../Services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userloginForm = new FormGroup({
    username: new FormControl(''),
  });

  constructor(private router:Router, private userService:UserService) {}

  login(){

    // console.log("### USER LOGIN FORM ###", this.userloginForm.value.username);

    const username = this.userloginForm.value.username;
    if(username != '') {
      this.userService.username = username;
      this.router.navigate(['/roomlist'])
    } else {
      // TODO: Add a user message to inform them of this error.
      console.log("ERROR: Must provide a username...");
    }
  }

  ngOnInit(){}

}
