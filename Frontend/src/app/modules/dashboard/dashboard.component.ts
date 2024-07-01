import { Component } from '@angular/core';
import {
  faChartPie,
  faChartBar,
  faArrowUp,
  faArrowDown,
  faUsers,
  faPercentage,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  faChartPie = faChartPie;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faUsers = faUsers;
  faPercent = faPercentage;
  faChartBar = faChartBar;
}
