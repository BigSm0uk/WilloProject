import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
