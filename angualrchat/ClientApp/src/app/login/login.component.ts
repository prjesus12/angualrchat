import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserControllerService } from '../servicios/UserController.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    Email: "",
    PasswordHash:""
  }
  constructor(private http: HttpClient, private usercontroller : UserControllerService, private router :Router, private toast: ToastrService
  ) { }

  ngOnInit() {
  }

  submit(){
    let url = "/api/user/login"
    if(this.user.Email == '' || this.user.PasswordHash == ''){
      //alert("Favor llenar credenciales")
      this.toast.error("Favor llenar credenciales")
      return;
    }
    this.http.post<any>(url, this.user).subscribe(data => {
      if (data) {
        
        if(data.Status == "Success"){
          let dataParsed = JSON.parse(data.Message)
          this.usercontroller.login(dataParsed.UserName, dataParsed.Id)
          
          this.toast.success(dataParsed.UserName + " logged")
          this.router.navigate(["/"]);
        }else{
          this.toast.error(data.Message)
          
        }
        
      }
      
      
    })
  }

}
