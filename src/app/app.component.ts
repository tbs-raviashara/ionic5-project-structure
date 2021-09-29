import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    if (localStorage.theme) {
      if (localStorage.theme == 'dark')
        document.body.classList.add('dark');
      document.body.setAttribute('data-theme', localStorage.theme);
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
