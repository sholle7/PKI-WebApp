
export class Order {
    userId: number
    cartId: number
    status: boolean

    constructor(userId: number, cartId: number, status: boolean) {
        this.userId = userId;
        this.cartId = cartId;
        this.status = status;
    }
}