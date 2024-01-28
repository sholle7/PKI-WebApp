
export class Cart {
    userId: number
    hashmapOfProducts: Map<number, number>

    constructor(userId: number, hashmapOfProducts: Map<number, number>) {
        this.userId = userId;
        this.hashmapOfProducts = hashmapOfProducts;

    }
}