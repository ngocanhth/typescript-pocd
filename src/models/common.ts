export interface PaginationParams {
    limit: number;
    page: number;
    totalRows: number;
}

export interface ListCategoryResponse<T> {
  data: T[];
}

// export interface ListResponse<T> extends ListCategoryResponse<T> {
//   pagination: PaginationParams;
// }
export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}
  
export interface ListCategoryParams {
  slug?: string | undefined;
  [key: string]: any;
}
  export interface ListParams {
    slug?: string;
    page?: number;
    sort?: string;
    [key: string]: any;
  }