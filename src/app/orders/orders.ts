import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Orders } from '../api/services/orders/orders.model';
import { OrdersService } from '../api/services/orders/orders.service';
import { NewOrderModalComponent } from './new-orders-modal/new-orders-modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NewOrderModalComponent]
})
export class OrdersComponent implements OnInit {
  orders: Orders[] = [];
  loading = true;
  error = '';
  showNewOrderModal = false;
  statusFilter: string = ''; // filtro vazio = mostra todos

  constructor(private ordersService: OrdersService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.ordersService.getOrders().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 401) {
          this.error = 'Você não tem permissão para acessar esta lista de pedidos.';
        } else if (err.status === 0) {
          this.error = 'Não foi possível conectar ao servidor.';
        } else {
          this.error = 'Erro ao carregar pedidos: ' + err.message;
        }
        this.cdr.detectChanges();
        console.error('Erro na requisição:', err);
      }
    });
  }

  get filteredOrders(): Orders[] {
    if (!this.statusFilter) return this.orders;
    return this.orders.filter(order => order.status === this.statusFilter);
  }

  openNewOrderModal() {
    this.showNewOrderModal = true;
  }

  closeNewOrderModal() {
    this.showNewOrderModal = false;
  }

  addNewOrder(order: Orders) {
    this.showNewOrderModal = false;
    this.loadOrders(); // recarrega a lista ao adicionar novo pedido
  }

  updateOrderStatus(order: Orders, status: Orders['status']) {
    this.ordersService.updateStatus(order.id, status).subscribe({
      next: updatedOrder => {
        this.orders = this.orders.map(o =>
          o.id === updatedOrder.id ? { ...o, status: updatedOrder.status } : o
        );
        this.cdr.detectChanges();
      },
      error: err => console.error('Erro ao atualizar status:', err)
    });
  }
}
