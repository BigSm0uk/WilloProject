import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-app';
}
