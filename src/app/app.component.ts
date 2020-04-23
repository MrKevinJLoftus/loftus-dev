import { Component } from '@angular/core';
import { Route } from './shared/models/general.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loftus.dev';
  routes: Route[] = [
    { url: '/', text: 'Home', icon: 'home' },
    { url: '/blog', text: 'Blog', icon: 'comment' },
    { url: '/projects', text: 'Projects', icon: 'build' },
  ];

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          return (child && child.snapshot.data.title) || '';
        })
      ).subscribe((title: string) => {
        this.titleService.setTitle(`${title} | ${this.title}`);
      });
    }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
