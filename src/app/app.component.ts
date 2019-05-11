import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Kerubin';
  urls = ['/login', '/newaccount', '/confirmaccount'];
  constructor(private router: Router) {
    //
  }

  canShowMenu() {
    const url = this.router.url.toLowerCase();
    const exists = this.urls.some(it => url.includes(it));
    return !exists;
  }
}
