import categoryApi from "@/api/categoryApi";
import { Product } from "@/models";
import { cartActions } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface IProductProps {
  product: Product;
}

export interface ProductCartPayload {
  product_sku: string;
  product_price: number;
  product_quantity: number
}

export const ProductItem: React.FC<IProductProps> = ({ product }) => {
  const dispatch = useAppDispatch();
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

  const handleAddToCart = async (productPayload: ProductCartPayload ) => {
   console.log(productPayload)
   const {product_sku, product_quantity, product_price} = productPayload

   dispatch(cartActions.addToCart(productPayload));
   const cartItems: any = await categoryApi.addToCart(productPayload);
  }

  // console.log("product: ", product);

  const productPayload = {
    'product_sku': product.sku,
    'product_quantity': 1,
    'product_price': product.price
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
          <input type="text" />
          <span className="increase change-qty">+</span>
        </div>
        <div className="Product-Action">
        <button onClick={() => handleAddToCart(productPayload)} className="btn-secondary add-to-cart">Add to cart</button>
        </div>
      </div>
    </Link>
  );
};
