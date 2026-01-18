import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login';

export  const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '' }             
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
