import { Product } from "@/models";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export interface IProductProps {
  product: Product;
}

export const ProductItem: React.FC<IProductProps> = ({ product }) => {
  const navigate = useNavigate();

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
      </div>
    </Link>
  );
};
