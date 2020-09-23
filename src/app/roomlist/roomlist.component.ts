import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../Services/user.service";

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {
  displayname: string;

  constructor(private router: Router, private userService:UserService) {
    this.displayname = userService.username;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);

  }

}
