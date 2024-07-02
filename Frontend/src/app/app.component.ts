import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { slider } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slider],
})
export class AppComponent {
  title = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      // 2. Start with ActivationEnd, experiment with the other events
      if (event instanceof ActivationEnd) {
        // 3. if your data exists assign it for use!
        if (event.snapshot.data['title']) {
          this.title = event.snapshot.data['title'];
        }
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
