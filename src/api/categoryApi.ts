import { cartPayload, cartResponse, Category, ListParams, ListResponse, product } from '@/models';
import axiosClient from './axiosClient';

const categoryApi = {
  getAllCategories(): Promise<ListResponse<Category>> {
    const url = 'category/';
    return axiosClient.get(url);
  },

  getChildCategory(slug: string): Promise<ListResponse<Category>> {
    const url = 'category/';
    return axiosClient.get(url);
  },
  
  getProductByCategory(params: ListParams): Promise<ListResponse<product>> {
    const url = 'category/';
    return axiosClient.get(url, { params });
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
