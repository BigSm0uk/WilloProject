import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";

export const routes: Routes = [
  {path: 'pumps', loadChildren: () => import('./components/pumps/pump-routes').then( (r)=> r.CLIENT_ROUTES)},
  {path: '**', component: MainPageComponent}
];
