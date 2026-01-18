// new-order-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Orders } from '../../api/services/orders/orders.model';
import { OrdersService } from '../../api/services/orders/orders.service';

@Component({
    selector: 'app-new-order-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="modal-backdrop">
      <div class="modal">
        <h3>Novo Pedido</h3>

        <label>Cliente:</label>
        <input type="text" [(ngModel)]="client" placeholder="Nome do cliente" />

        <div *ngFor="let item of items; let i = index" class="product-item">
          <label>Produto {{ i + 1 }}:</label>
          <input type="text" [(ngModel)]="item.product" placeholder="Nome do produto" />

          <label>Quantidade:</label>
          <input type="number" [(ngModel)]="item.quantity" min="1" />

          <label>Preço:</label>
          <input type="number" [(ngModel)]="item.price" min="0" step="0.01" />

          <button class="remove-btn" (click)="removeItem(i)" *ngIf="items.length > 1">Remover</button>
        </div>

        <button class="add-btn" (click)="addItem()">+ Adicionar Produto</button>

        <div class="buttons">
          <button (click)="createOrder()">Salvar Pedido</button>
          <button (click)="close.emit()">Cancelar</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal-backdrop {
      position: fixed; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center;
    }
    .modal {
      background:white; padding:20px; border-radius:8px; width:350px;
      max-height: 90vh; overflow-y: auto;
    }
    .modal input { width:100%; margin-bottom:8px; padding:4px; }
    .buttons { display:flex; justify-content:space-between; margin-top:12px; }
    .add-btn { margin-bottom:12px; }
    .remove-btn { margin-top:4px; background:red; color:white; border:none; border-radius:4px; padding:2px 6px; cursor:pointer; }
    .product-item { border-bottom: 1px solid #eee; margin-bottom:8px; padding-bottom:8px; }
  `]
})
export class NewOrderModalComponent {
    client = '';
    items: { product: string; quantity: number; price: number }[] = [
        { product: '', quantity: 1, price: 0 }
    ];

    @Output() close = new EventEmitter<void>();
    @Output() orderCreated = new EventEmitter<Orders>();

    constructor(private ordersService: OrdersService) { }

    addItem() {
        this.items.push({ product: '', quantity: 1, price: 0 });
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
    }
    createOrder() {
        const total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderToSend: Omit<Orders, 'id' | 'createdAt'> = {
            client: this.client,
            items: this.items.map(i => ({
                id: '',
                orderId: '',
                product: i.product,
                quantity: i.quantity,
                price: i.price
            })),
            total,
            status: 'PENDENTE'
        };

        this.ordersService.createOrder(orderToSend).subscribe({
            next: (newOrder) => {
                this.orderCreated.emit(newOrder);
                this.close.emit();
            },
            error: (err) => console.error(err)
        });
    }

}
