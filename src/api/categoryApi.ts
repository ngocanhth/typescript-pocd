import { cartPayload, cartResponse, Category, ListCategoryParams, ListParams, ListResponse, Product } from '@/models';
import axiosClient from './axiosClient';

const categoryApi = {
  async getAllCategories(params: ListCategoryParams): Promise<ListResponse<Category>> {
    const url = 'category/';
    const categoryList: Category[] = await axiosClient.get(url, { params });
    return {
      data: categoryList
    }
  },
  
  async getProductByCategory(params: ListParams): Promise<ListResponse<Product>> {
    const url = 'product-list/';
    const productList: Product[] = await axiosClient.get(url, { params });
    return {
      data: productList
    }
  },

  addToCart(data: cartPayload): Promise<cartResponse> {
    const url = 'cart-items/';
    return axiosClient.post(url, data);
  },

//   getProductByCategory(id: string): Promise<Student> {
//     const url = `/students/${id}`;
//     return axiosClient.get(url);
//   }

};

export default categoryApi;
