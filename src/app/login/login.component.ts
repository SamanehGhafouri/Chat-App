import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "../Services/user.service";
import {Router} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // userloginForm = new FormGroup({
  //   username: new FormControl(''),
  // });
  //
  userLoginForm: FormGroup;

  constructor(private router: Router, private userService: UserService) {
  }

  login() {
    //validation
    if (this.userLoginForm.invalid) {
      return
    }

    const username = this.userLoginForm.value.username;
    if (username != '') {
      this.userService.username = username;

      const query = firebase.database().ref().child('users').orderByChild('name').limitToFirst(1).equalTo(username)
      query.once('value', (snap: any) => {

        if (snap.val() === null) {

          // Create record...
          const newUser = firebase.database().ref('users/').push();
          newUser.set({name: username});

        } else {

          // get uid of user and store it in the user service
          snap.forEach((childSnap: any) => {
            // we assume that there is only one object since the query has a limit to 1
            // TODO: we can and should enforce this assumed unique username as a Firebase/Database rule.
            this.userService.userId = childSnap.key;
          });
        }

        this.router.navigate(['/roomlist'])
      });

    } else {
      // TODO: Add a user message to inform them of this error.
      console.log("ERROR: Must provide a username...");
    }
  }

  ngOnInit() {
    //Validation
    this.userLoginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(1)])
    });
  }

  //Validation
  get username() {
    return this.userLoginForm.get('username');
  }

}
