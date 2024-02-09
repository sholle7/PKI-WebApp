"use client"
import { carts, orders, products } from '@/database/database'
import { Cart } from '@/models/Cart'
import { Order } from '@/models/Order'
import { Product, Types } from '@/models/Product'
import { User } from '@/models/User'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

const BuyerCart = observer(() => {
  const [fullPrice, setFullPrice] = useState(0)
  const [cart, setCart] = useState<Cart | undefined>(undefined)
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  useEffect(() => {
    const loggedUser: User | null = JSON.parse(localStorage.getItem("user")!);
    setLoggedUser(loggedUser);

    const userCart: Cart | undefined = carts.find(cart => cart.userId === loggedUser?.id)
    setCart(userCart);
  }, [loggedUser?.id])

  useEffect(() => {
    if (!cart) return;

    let totalPrice = 0;

    for (const [productId, quantity] of cart.hashmapOfProducts) {
      const product: Product | undefined = products.find(p => p.id === productId);
      if (product) {
        totalPrice += product.price * quantity;
      }
    }

    setFullPrice(totalPrice);
  }, [cart]);

  const makeAnOrder = () => {
    const order = new Order(orders.length + 1, loggedUser?.id ?? 0, cart?.id ?? 0, null)
    orders.push(order)
    
    for (const [productId, quantity] of cart?.hashmapOfProducts || []) {
      order.products.set(productId, quantity);
    }

    cart?.hashmapOfProducts.clear();

    const cartIndex = carts.findIndex(c => c.userId === loggedUser?.id);
    if (cartIndex !== -1) {
      carts.splice(cartIndex, 1);
    }

    setCart(undefined);
    setFullPrice(0);
  }

  return (
    <div className='cartContainer'>
      <div>
        {cart && cart.hashmapOfProducts && Array.from(cart.hashmapOfProducts.entries()).map(([productId, quantity]) => {
          const product: Product | undefined = products.find(p => p.id === productId);
  
          return (
            <div key={productId} >
              {product && (
                <div className='productRow'>
                  <p>{product.name}</p>
                  <img src={product.pictureURL} alt={product.name} style={{ width: '100px', height: '100px' }} />
                  <p>X {quantity}</p>
                  <p>{product.price * quantity} RSD</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <h5 id="dividerCart"></h5>
      <div id='fullPrice'>
        Cena: {fullPrice} RSD
      </div>
  
      <div>
        <button className='submitButton' onClick={() => makeAnOrder()}>Poruči</button>
      </div>
    </div>
  )
})

export default BuyerCart;
