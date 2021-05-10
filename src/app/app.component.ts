import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { SocialloginService } from './sociallogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  socialUser : SocialUser;
  isLoggedin: boolean;  
  response: any;
  name : String;

  constructor(
    private socialloginService : SocialloginService,
    private router : Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
      this.Savesresponse(socialUser);
      this.name = socialUser.name;
    });
    this.isLoggedin=true;
  }

  Savesresponse(socialUser : SocialUser){
    this.socialloginService.Savesresponse(socialUser).subscribe((res : any)=>{
      this.socialUser = res;
      this.response = res.userDetail;
      console.log(res);
      localStorage.setItem('id', socialUser.id);
      localStorage.setItem('token', socialUser.authToken);
      this.router.navigate([`/`]); 
    })
  }

  logOut(): void {
    this.socialloginService.Removeresponse(localStorage.getItem('id')).subscribe((res : any)=>{
      console.log(res);
    });
    this.socialAuthService.signOut();
    console.log("logging out");
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.isLoggedin=false;
  }

}