"use client"
import React, { useEffect, useState } from 'react';
import { products } from '@/database/database';
import { Product, Types } from '@/models/Product';
import Link from 'next/link';

const BuyerProducts = () => {
  const [productCakeIds, setProductCakeIds] = useState([0, 1, 2]);
  const [productsCake, setProductsCake] = useState<Product[]>([]);
  const [productPastryIds, setProductPastryIds] = useState([0, 1, 2]);
  const [productsPastry, setProductsPastry] = useState<Product[]>([]);

  useEffect(() => {
    setProductsCake(products.filter((product) => product.type === Types.cake));
    setProductsPastry(products.filter((product) => product.type === Types.pastry));
  }, []);

  const handleLeftCakeIconClick = () => {
    setProductCakeIds((prevIds) =>
      prevIds.map((id) => (id - 3 >= 0 ? id - 3 : (id - 3) % productsCake.length + productsCake.length))
    );
  };
  
  const handleRightCakeIconClick = () => {
    setProductCakeIds((prevIds) =>
      prevIds.map((id) => (id + 3) % productsCake.length)
    );
  };

  const handleLeftPastryIconClick = () => {
    setProductPastryIds((prevIds) =>
      prevIds.map((id) => (id - 3 >= 0 ? id - 3 : (id - 3) % productsPastry.length + productsPastry.length))
    );
  };
  
  const handleRightPastryIconClick = () => {
    setProductPastryIds((prevIds) =>
      prevIds.map((id) => (id + 3) % productsPastry.length)
    );
  };
  
  return (
    <div className='buyerProductsContainer'>
      <div className='cakeContainer' key="cakeContainer">
        <h1>Torte</h1>
        {productsCake.length > 0 &&
          productCakeIds.map((id) => (
            <div key={id}>
              {productsCake[id] && (
                <>
                  <h2>{productsCake[id].name}</h2>
                  <Link href={`/buyerProducts/${productsCake[id].id}`}>
                    <img
                      src={productsCake[id].pictureURL}
                      alt={productsCake[id].name}
                      style={{ width: '150px', height: '150px' }}
                    />
                  </Link>
                </>
              )}
            </div>
          ))}
        <svg
          onClick={handleLeftCakeIconClick}
          height="50px"
          width="50px"
          viewBox="0 0 1024 1024"
          className="icon leftArrowCake"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"></path>
          </g>
        </svg>
        <svg
          onClick={handleRightCakeIconClick}
          height="50px"
          width="50px"
          viewBox="0 0 1024 1024"
          className="icon rightArrowCake"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"></path>
          </g>
        </svg>
      </div>

      <div className='pastryContainer' key="pastryContainer">
        <h1>Kolaci</h1>
        {productsPastry.length > 0 &&
          productPastryIds.map((id) => (
            <div key={id}>
              {productsPastry[id] && (
                <>
                  <h2>{productsPastry[id].name}</h2>
                  <Link href={`/buyerProducts/${productsPastry[id].id}`}>
                    <img
                      src={productsPastry[id].pictureURL}
                      alt={productsPastry[id].name}
                      style={{ width: '150px', height: '150px' }}
                    />
                  </Link>
                </>
              )}
            </div>
          ))}
        <svg
          onClick={handleLeftPastryIconClick}
          height="50px"
          width="50px"
          viewBox="0 0 1024 1024"
          className="icon leftArrowPastry"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"></path>
          </g>
        </svg>
        <svg
          onClick={handleRightPastryIconClick}
          height="50px"
          width="50px"
          viewBox="0 0 1024 1024"
          className="icon rightArrowPastry"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BuyerProducts;

