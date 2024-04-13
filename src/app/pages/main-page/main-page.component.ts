import {Component} from '@angular/core';
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {


}
