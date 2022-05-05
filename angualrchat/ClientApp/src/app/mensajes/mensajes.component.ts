import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Mensaje } from '../models/Mensaje';
import { SignalrcustomService } from '../servicios/signalrcustom.service';
import { UserControllerService } from '../servicios/UserController.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  mensaje = {
    IdUser:"",
    Mensaje:"",
    UserName: "",
    CreatedDate: new Date()
  }

  mensajes: Array<Mensaje> =[]
  constructor(public usercontroller: UserControllerService, private http: HttpClient, private sender: SignalrcustomService, private cdr: ChangeDetectorRef) {
    if(usercontroller.isAuth){
      this.fetchOnInit();
    }
  }

  ngOnInit() {
    this.scrollChat()
    //this.sender.hubConnection.on("todos")
    this.sender.emNotifica.subscribe((value) => {
     
      this.mensajes.push(value);
      this.scrollChat()
      setInterval(() => {
        this.cdr.detectChanges();
      }, 500);
     
    })
  }

  // submit(){
  //   this.mensajes.push({
  //     mensaje: this.mensaje.Mensaje,
  //     UserName: "Bob"
  //   })
  //   this.scrollChat()
  // }

  submit(){
    if(this.mensaje.Mensaje == ''){
      alert("Cant send empty message")
      return;
    }
    this.mensaje.IdUser = this.usercontroller.Token;
    this.mensaje.UserName = this.usercontroller.UserName;
    this.mensaje.CreatedDate = new Date();
    let url = "/api/MensajeDbs"
    //url = "https://jesuschat.azurewebsites.net/api/MensajeDbs"
    this.http.post<any>(url, this.mensaje).subscribe((res) => {
      
      this.emmitMensaje()
      //this.mensajes.push(res)
    })
  }

  emmitMensaje(){
    let url = "/api/sender"
    //url = "https://jesuschat.azurewebsites.net/api/sender"
    this.http.post<any>(url, this.mensaje).subscribe((res) => {
     
      this.mensaje.Mensaje = ''
      this.scrollChat()
      //this.mensajes.push(res)
    })
  }

  scrollChat() {
    var chat = document.getElementById("chat") as HTMLDivElement;

    setTimeout(() => {
      chat.scrollTo({behavior: "smooth", top: chat.scrollHeight})
    }, 300);
    
  }

  fetchOnInit(){
    let url = "/api/MensajeDbs";
    this.http.get<any>(url, {
      params: {
        Token: this.usercontroller.Token
      }
    }).subscribe((res) => {
      
      //this.mensajes 
      this.mensajes = res;
      this.scrollChat()
    })
  }

  mymessages(value:any){
    if(value.userName == this.usercontroller.UserName){
      return 'self-end text-white bg-blue-400'
    }
    if(value.UserName == this.usercontroller.UserName){
      return 'self-end text-white bg-blue-400'
    }
    return 'self-start text-white bg-slate-400'
  }

  parseDate(date:any){
    return moment(date).format("hh:mm a")
  }

}
