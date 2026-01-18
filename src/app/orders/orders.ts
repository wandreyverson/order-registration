import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Orders } from '../api/services/orders/orders.model';
import { OrdersService } from '../api/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe]
})

export class OrdersComponent implements OnInit {
  orders: Orders[] = [];
  loading = true;
  error = '';

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Dados recebidos:', data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar pedidos';
        this.loading = false;
      }
    });
  }

  updateOrderStatus(order: Orders, status: Orders['status']) {
    this.ordersService.updateStatus(order.id, status).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex(o => o.id === updatedOrder.id);
        if (index > -1) {
          this.orders[index].status = updatedOrder.status;
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar status:', err);
      }
    });
  }
}
