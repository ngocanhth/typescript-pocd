import { Product } from "@/models";
import React from "react";
import { ProductItem } from "./ProductItem";

export interface IProductsListProps {
  productList: Product[];
}

export const ProductsList: React.FC<IProductsListProps> = ({ productList }) => {
  return (
    <div className="ProductsList">
      {productList.map(product => (
        <div className="grid-wrapper" key={product.sku}>
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
};
