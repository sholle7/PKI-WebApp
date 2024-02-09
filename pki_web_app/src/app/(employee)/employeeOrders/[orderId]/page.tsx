"use client"
import React, { useEffect, useState } from 'react';
import { carts, notifications, orders, products } from '@/database/database';
import { Cart } from '@/models/Cart';
import { Notification } from '@/models/Notification';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { User } from '@/models/User';
import { useStores } from '@/stores/useStores';
import { usePathname, useRouter } from 'next/navigation';

const SingleOrder = () => {
  const { userStore } = useStores();
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>(undefined);
  const [fullPrice, setFullPrice] = useState(0);
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [orderProducts, setOrderProducts] = useState<{ product: Product; quantity: number }[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const orderId = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const loggedUser: User | null = JSON.parse(localStorage.getItem('user')!);
    const order = orders.find((o) => o.id == parseInt(orderId));


    setCurrentOrder(order);
    setLoggedUser(loggedUser);

    let totalPrice = 0;
    const orderProducts: { product: Product; quantity: number }[] = [];

    for (const [productId, quantity] of order?.products!) {
      const product: Product | undefined = products.find((p) => p.id === productId);

      if (product) {
        totalPrice += product.price * quantity;
        orderProducts.push({product, quantity});
      }
    }

    setFullPrice(totalPrice);
    setOrderProducts(orderProducts);
  }, [orderId]);

  const acceptOrder = () => {
    const orderIndex = orders.findIndex((order) => order.id === parseInt(orderId));
    if (orderIndex !== -1) {
      orders[orderIndex].status = true;
    }
    const newNotification: Notification = new Notification(
      currentOrder?.userId?? 0,
      new Date(),
      'Vasa narudzbina sa id ' + orderId + ' je uspesno prihvacena',
      true
    );
    notifications.push(newNotification);
    router.back();
  };

  const rejectOrder = () => {
    const orderIndex = orders.findIndex((order) => order.id === parseInt(orderId));
    if (orderIndex !== -1) {
      orders[orderIndex].status = false;
    }
    const newNotification: Notification = new Notification(
      currentOrder?.userId?? 0,
      new Date(),
      'Vasa narudzbina sa id ' + orderId + ' nije uspesno prihvacena',
      true
    );
    notifications.push(newNotification);
    router.back();
  };

  return (
    <div className='cartContainer'>
    <div>
      {orderProducts &&
        orderProducts.map((product) => (
          <div key={product.product.id} className='productRow'>
            <p>{product.product.name}</p>
            <img
              src={product.product.pictureURL}
              alt={product.product.name}
              style={{ width: '100px', height: '100px' }}
            />
            <p>X {product.quantity}</p>
            <p>{product.product.price * product.quantity} RSD</p>
          </div>
        ))}
    </div>
    <h5 id='dividerCart'></h5>
    <div id='fullPrice'>Cena: {fullPrice} RSD</div>

    <div style={{ display: 'flex', gap: '20px' }}>
      <button className='submitButton' onClick={() => acceptOrder()}>
        Prihvati
      </button>
      <button className='submitButton' onClick={() => rejectOrder()}>
        Odbij
      </button>
    </div>
  </div>
  );
};

export default SingleOrder;
