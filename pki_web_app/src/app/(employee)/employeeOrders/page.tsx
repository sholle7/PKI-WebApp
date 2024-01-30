"use client"
import { notifications, orders } from '@/database/database'
import { User } from '@/models/User'
import { Notification } from '@/models/Notification';
import { useStores } from '@/stores/useStores'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Order } from '@/models/Order';
import Link from 'next/link';

const EmployeeOrders = observer(() => {
  const { userStore } = useStores()
  const [allOrdersForUser, setAllOrdersForUser] = useState<Order[] | null>(null)
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  useEffect(()=>{
    const loggedUser: User | null = JSON.parse(localStorage.getItem("user")!);
    setLoggedUser(loggedUser);
    setAllOrdersForUser(orders.filter(order => order.status == null));
  }, [])

  return (
    <div className='orderContainer'>
      <ul className='orderList' >
        {allOrdersForUser?.map((order, index) => ( 
            <li key={index} style={{backgroundColor: "#e2e1e5"}}>
              <Link href={`/employeeOrders/${order.id}`}>
              <div className='orderText'>
                <p>Narudzbina sa id #{order.id}</p>
              </div>
              </Link>
            </li>
        ))}
      </ul>
    </div>
  )
})

export default EmployeeOrders