import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserControllerService implements OnInit {
  isAuth = false;
  UserName = "";
  Token=""
  constructor() { 
    this.init();
  }
  ngOnInit(): void {
    this.init();
  }
  init(){
    if(sessionStorage.getItem("User")){
      let parsed = JSON.parse(sessionStorage.getItem("User") || '{}');
      if(parsed){
        this.isAuth = true;
        this.UserName = parsed.UserName;
        this.Token = parsed.Token;
      }
      
    }
  }
  
  login(UserName:string, Token:string){
    this.isAuth = true;
    this.UserName = UserName;
    this.Token = Token;
    
    sessionStorage.setItem("User", JSON.stringify(
      {
        isAuth: this.isAuth,
        UserName: UserName,
        Token: this.Token
      }
    ))
  }

  logout(){
    this.isAuth = false;
    this.UserName = "";
    this.Token = "";
    sessionStorage.removeItem("User")
  }
}


