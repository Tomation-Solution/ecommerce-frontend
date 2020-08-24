import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login-register/auth.service';

@Component({
  selector: 'app-headertop',
  templateUrl: './headertop.component.html',
  styleUrls: ['./headertop.component.css']
})
export class HeadertopComponent implements OnInit {
  username = '';
  role: string;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.username.subscribe(result => this.username = result);


  }
}
