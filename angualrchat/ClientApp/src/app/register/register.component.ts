import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    Email:"",
    UserName: "",
    PasswordHash:""
  }
  constructor(private http: HttpClient, private toast: ToastrService) { }

  ngOnInit() {
  }

  submit(){
    let url = "/api/user/register"
    if(this.user.Email == "" || this.user.PasswordHash == "" || this.user.UserName ==""){
     
      this.toast.error("Fill the fields")
      return ;
    }
    if(!this.user.Email.includes("@")){
      this.toast.error("Use a email format")
      return ;
    }
    this.http.post<any>(url, this.user).subscribe(data => {
      if (data.Status == 'Success') {
        this.toast.success(data.Message)
        this.user = {
          Email: "",
          UserName: "",
          PasswordHash: ""
        }
      }else{
        this.toast.error(data.Message)
      }  
    })
  }

}
