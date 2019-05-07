import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Kerubin';

  constructor(private router: Router) {
    //
  }

  canShowMenu() {
    const url = this.router.url;
    const result = url !== '/login' && url !== '/newaccount' && url !== '/confirmaccount';
    return result;
  }

}
