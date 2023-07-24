import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CalcularComponent } from './calcular/calcular.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'pincipal', component: PrincipalComponent},
  { path: 'calcular', component: CalcularComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
