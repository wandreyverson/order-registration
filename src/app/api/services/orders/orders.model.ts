export interface OrdersItem {
    id: string;
    orderId: string;
    product: string;
    quantity: number;
    price: number;
}

export interface Orders {
    id: string;
    client: string;
    items: OrdersItem[];
    total: number;
    status: string;
    createdAt: Date;
}
