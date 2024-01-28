
export class Order {
    id: number
    userId: number
    cartId: number
    status: boolean
    
    constructor(id: number, userId: number, cartId: number, status: boolean) {
        this.id = id;
        this.userId = userId;
        this.cartId = cartId;
        this.status = status;
    }
}