import {Routes} from "@angular/router";
import {PumpsComponent} from "./pumps/pumps.component";
import {ConcretePumpComponent} from "./concrete-pump/concrete-pump.component";

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: PumpsComponent,
  },
  {
    path: ':id',
    component: ConcretePumpComponent,
  },
];
