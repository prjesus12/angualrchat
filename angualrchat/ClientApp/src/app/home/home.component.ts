import { Component } from '@angular/core';
import { UserControllerService } from '../servicios/UserController.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(public usercontroller: UserControllerService){
    //
  }
}
