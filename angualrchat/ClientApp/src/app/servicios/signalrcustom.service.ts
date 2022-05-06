import { Injectable, EventEmitter } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Mensaje } from '../models/Mensaje';
@Injectable({
  providedIn: 'root'
})
export class SignalrcustomService {
  public hubConnection: HubConnection;
  emNotifica: EventEmitter<Mensaje> = new EventEmitter();
  constructor() {
    let builder = new HubConnectionBuilder();
    let url = "https://jesuschat.azurewebsites.net/cnn"
    //url ="http://localhost:5069/cnn"
    this.hubConnection = builder.withUrl(url).build();

    this.hubConnection.on("enviartodos", (mensaje) => {
      
      let msg: Mensaje = JSON.parse(mensaje)

      this.emNotifica.emit(msg)
      
    })

    this.hubConnection.start();
  }
}
