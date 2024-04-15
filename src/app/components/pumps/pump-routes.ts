import {Routes} from "@angular/router";
import {PumpsComponent} from "./pumps/pumps.component";
import {CreatePumpComponent} from "./create-pump/create-pump.component";
import {ConcretePumpEditComponent} from "./concrete-pump-edit/concrete-pump-edit.component";

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: PumpsComponent,
  },
  {
    path:'create',
    component: CreatePumpComponent, pathMatch: 'full'
  },
  {
    path: ':id',
    component: ConcretePumpEditComponent,
  },
];
