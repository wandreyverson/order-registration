import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Orders } from '../api/services/orders/orders.model';
import { OrdersService } from '../api/services/orders/orders.service';
import { NewOrderModalComponent } from './new-orders-modal/new-orders-modal';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf, CurrencyPipe, DatePipe, NewOrderModalComponent]
})

export class OrdersComponent implements OnInit {
  orders: Orders[] = [];
  loading = true;
  error = '';
  showNewOrderModal = false;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar pedidos';
        this.loading = false;
      }
    });
  }

  openNewOrderModal() {
    this.showNewOrderModal = true;
  }

  closeNewOrderModal() {
    this.showNewOrderModal = false;
  }

  addNewOrder(order: Orders) {
    this.orders = [order, ...this.orders];
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

