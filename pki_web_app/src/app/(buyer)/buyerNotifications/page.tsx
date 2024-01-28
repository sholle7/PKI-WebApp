"use client"
import { notifications } from '@/database/database'
import { User } from '@/models/User'
import { Notification } from '@/models/Notification';
import { useStores } from '@/stores/useStores'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

const buyerNotifications = observer(() => {
  const { userStore } = useStores()
  const [allNotificaitonsForUser, setAllNotificationsForUser] = useState<Notification[] | null>(null)
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  useEffect(()=>{
    const loggedUser: User | null = JSON.parse(localStorage.getItem("user")!);
    setLoggedUser(loggedUser);
    setAllNotificationsForUser(notifications.filter(notification => notification.userId === loggedUser?.id));
  }, [])

  return (
    <div className='notificationsContainer'>
      <ul className='notificationList' >
        {allNotificaitonsForUser?.map((notification, index) => (
          <li key={index} style={{backgroundColor: notification.status==true?"green": "#FF6961"}}>
            <div className='notificationDate'>
              <p>{notification.date.toString()}</p>
            </div>
            <div className='notificationText'>
              <p>{notification.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default buyerNotifications