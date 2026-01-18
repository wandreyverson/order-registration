import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  standalone: true,
  imports: [CommonModule]  // <--- necessário para NgIf, NgFor e pipes como currency
})

export class OrdersComponent {
  orders = [
    { id: 1, client: 'João', total: 150.50, status: 'Pendente' },
    { id: 2, client: 'Maria', total: 230.00, status: 'Entregue' },
    { id: 3, client: 'Carlos', total: 120.99, status: 'Cancelado' },
  ];
}
