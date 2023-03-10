import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserData } from 'src/app/interfaces/userData.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userData: UserData = { id: 0, username: "", email: "", firstname: "", lastname: "", centro: undefined, date: undefined, password: "" };
  session: boolean = this.token.isLoggedIn();

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) { }

  ngOnInit(): void {
    this.authService.profile();
    this.userData = this.authService.UserData;
    this.authService.loginStatusChange().subscribe(loggedIn => {
      this.session = loggedIn;
    });
  }

  endSession() {
    this.token.removeToken()
    this.router.navigate(['main']);
    this.session = false;
  }

}
