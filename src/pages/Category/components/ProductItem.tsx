import { Product } from "@/models";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface IProductProps {
  product: Product;
}

export const ProductItem: React.FC<IProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const handleDecreaseQty = (qty: number) => {
    qty -= 1;
    setQty(qty);
  }

  const handleIncreaseQty = (qty: number) => {
    qty += 1;
    setQty(qty);
  }

  const handleAddToCart = () => {
    
  }

  return (
    <Link
      to={{
       
      }}
    >
      <div className="Product">
        <img
          className="Product-Images"
          src={product.image_url}
          alt={product.name}
        />
        <div className="Product-Title">{product.name}</div>
        <div className="Product-Price">{product.price}$</div>
        <div className="Product-Qty">
          <span onClick={() => handleDecreaseQty} className="decrease change-qty">-</span>
          <input type="text"/>
          <span className="increase change-qty">+</span>
        </div>
        <div className="Product-Action">
        <button onClick={handleAddToCart} className="btn-secondary add-to-cart">Add to cart</button>
        </div>
      </div>
    </Link>
  );
};
