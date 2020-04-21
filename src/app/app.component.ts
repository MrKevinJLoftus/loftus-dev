import { Component } from '@angular/core';
import { Route } from './shared/models/general.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loftus-dev';
  routes: Route[] = [
    { url: '/home', text: 'Home', icon: 'home' },
    { url: '/blog', text: 'Blog', icon: 'comment' },
    { url: '/projects', text: 'Projects', icon: 'build' },
  ];

  constructor(
    private router: Router
  ) { }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
