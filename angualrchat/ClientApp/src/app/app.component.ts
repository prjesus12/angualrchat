import { Component } from '@angular/core';
import { SignalrcustomService } from './servicios/signalrcustom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private servicio: SignalrcustomService) {

  }
}
