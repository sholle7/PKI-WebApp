
export class Order {
    id: number
    userId: number
    cartId: number
    status: boolean | null
    
    constructor(id: number, userId: number, cartId: number, status: boolean | null) {
        this.id = id;
        this.userId = userId;
        this.cartId = cartId;
        this.status = status;
    }
}