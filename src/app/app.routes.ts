import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders';
import { Login } from './login/login';
import { HttpClientModule } from '@angular/common/http';

export  const routes: Routes = [
  { path: '', component: Login },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '' }             
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
