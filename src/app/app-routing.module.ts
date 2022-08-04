import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { TiendaComponent } from './components/store/store.component';

const routes: Routes = [
  {path:'home', component: TiendaComponent},
  {path:'shoppingcart',pathMatch:'full',component:ShoppingcartComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'**',pathMatch:'full',redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
