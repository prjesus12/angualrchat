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
   
    this.sender.emNotifica.subscribe((value) => {
      if (value) {
        if (value.Mensaje != '')
        this.mensajes.push(value);
        this.scrollChat()
      }
      
      //verifica si hay un cambio en la data para renderizar el nuevo cambio
      setInterval(() => {
        this.cdr.detectChanges();
      }, 500);
     
    })
  }

  /*
    guarda el mensaje en la base de datos
  */
  submit(){
    if(this.mensaje.Mensaje == ''){
      alert("Cant send empty message")
      return;
    }
    this.mensaje.IdUser = this.usercontroller.Token;
    this.mensaje.UserName = this.usercontroller.UserName;
    this.mensaje.CreatedDate = new Date();
    let url = "/api/MensajeDbs"
    
    this.http.post<any>(url, this.mensaje).subscribe((res) => {
      
      this.emmitMensaje()
     
    })
  }
  /*
    envia el mensaje a todos los usuarios loggeados
  */
  emmitMensaje(){
    let url = "/api/sender"
    //url = "https://jesuschat.azurewebsites.net/api/sender"
    this.http.post<any>(url, this.mensaje).subscribe((res) => {
     
      this.mensaje.Mensaje = ''
      this.scrollChat()
      
    })
  }

  /*
    busca el elem chat en el html y hace scroll hasta el ultimo mensaje
  */
  scrollChat() {
    var chat = document.getElementById("chat") as HTMLDivElement;

    setTimeout(() => {
      chat.scrollTo({behavior: "smooth", top: chat.scrollHeight})
    }, 300);
    
  }


  /*
    Para buscar todos los mensajes 
  */
  fetchOnInit(){
    let url = "/api/MensajeDbs";
    this.http.get<any>(url, {
      params: {
        Token: this.usercontroller.Token
      }
    }).subscribe((res) => {
      
      //this.mensajes
      if (res.length > 0) {
        this.mensajes = res.reverse();
        this.scrollChat()
      }
      
    })
  }
  /*
    Para darle estilo a los mensajes en el html
    Si el mensaje del usuario es igual su username ... el mensaje se muestra a la derecha en color azul
    de lo contrario ... el mensaje va a la izquierda en color gris
  */
  mymessages(value:any){
    
    if(value.UserName == this.usercontroller.UserName){
      return 'self-end text-white bg-blue-400'
    }
    return 'self-start text-white bg-slate-400'
  }

  parseDate(date:any){
    return moment(date).format("hh:mm a")
  }

}
