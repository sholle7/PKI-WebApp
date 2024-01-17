"use client"
import { User } from '@/models/User';
import { useStores } from '@/stores/useStores'
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'

const BuyerHomepage = observer(() => {
  const { userStore } = useStores();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(userStore.loggedUser)
  }, [])

  return (
    <div>
        <p>First Name: {currentUser?.firstName}</p>
        <p>Last Name: {currentUser?.lastName}</p>
    </div>
  );
});

export default BuyerHomepage;
