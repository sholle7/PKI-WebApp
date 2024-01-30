"use client"
import { products } from '@/database/database';
import { Product, Types } from '@/models/Product';
import React, { useState } from 'react'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
    composition: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e: { target: { value: any; files: any; }; }) => {
    const selectedImage = e.target.files[0];
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductData({
        ...productData,
        image: reader.result as string
      });
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!productData.image || !productData.name || !productData.description || !productData.price || !productData.composition) {
      alert('Molimo vas da popunite sva polja pre dodavanja proizvoda.');
      return;
    }

    const newProduct = new Product(
      products.length + 1,
      productData.name,
      productData.composition == "torta"? Types.cake : Types.pastry,
      parseFloat(productData.price),
      productData.description,
      productData.image
    );

    products.push(newProduct);
    resetForm();
  };

  const resetForm = () => {
    setProductData({
      image: '',
      name: '',
      description: '',
      price: '',
      composition: '',
    });
  };

  return (
    <div className='addProductContainer'>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
        </label>

        <label>
          Opis:
          <input type="text" name="description" value={productData.description} onChange={handleInputChange} />
        </label>

        <label>
          Cena:
          <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
        </label>

        <label>
          Sastav:
          <select name="composition" value={productData.composition} onChange={handleInputChange}>
            <option value="">Izaberite sastav</option>
            <option value="cake">Kolac</option>
            <option value="pastry">Torta</option>
          </select>
        </label>

        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
        </div>

        <button style={{ marginLeft: "25%" }} type="submit" className='submitButton'>Dodaj proizvod</button>
      </form>
    </div>
  );
};

export default AddProduct;