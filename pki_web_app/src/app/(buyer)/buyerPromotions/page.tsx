"use client"
import React, { useEffect, useState } from 'react'
import { User } from '@/models/User';
import { useStores } from '@/stores/useStores'
import { observer } from 'mobx-react';
import { products } from '@/database/database';

const BuyerPromotions = observer(() => {
  const { userStore } = useStores();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [productId, setProductId] = useState(1);

  useEffect(() => {

    const intervalId = setInterval(() => {
      handleRightIconClick();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [productId]);

  useEffect(() => {
    setCurrentUser(userStore.loggedUser)
  }, [])

  const handleLeftIconClick = () => {
    if(productId > 1){
      setProductId(productId - 1)
    }
    else {
      setProductId(3)
    }
  }

  const handleRightIconClick = () => {
    if(productId < 3){
      setProductId(productId + 1)
    }
    else {
      setProductId(1)
    }
  }

  return (
    <>
      <div className='productsWrapper'>
            <h1>{products[productId].name}</h1>
            <img
                src={products[productId].pictureURL}
                alt={products[productId].name}
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />

              <div className='descriptionWrapper'>
                <p>{products[productId].description}</p>
              </div>
      </div>
  
      <svg onClick={() => handleLeftIconClick()} height="100px" width="100px" viewBox="0 0 1024 1024" className="icon leftArrow" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"></path></g></svg>
      <svg onClick={() => handleRightIconClick()} height="100px" width="100px" viewBox="0 0 1024 1024" className="icon rightArrow" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"></path></g></svg>
    </>
  );
});

export default BuyerPromotions;
