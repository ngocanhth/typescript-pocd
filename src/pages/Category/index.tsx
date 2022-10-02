import categoryApi from '@/api/categoryApi';
import { Category, ListCategoryParams, ListCategoryResponse, ListParams, ListResponse, Product } from '@/models';
import { categoryActions, selectCategoryFilter, selectCategoryList, selectCategoryLoading } from '@/store/categorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { productActions, selectProductFilter, selectProductList, selectProductLoading, selectProductPagination } from '@/store/productSlice';
import { ChangeEvent, useEffect } from 'react';
import isNil from "lodash/isNil";
import isNaN from "lodash/isNaN";
import { ProductsList } from './components/ProductsList';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
export interface ICategoryListProps {
}

export function CategoryList (props: ICategoryListProps) {
  // const [categories, setCategories] = useState([]);
  const filter = useAppSelector(selectCategoryFilter);
  const loading = useAppSelector(selectCategoryLoading);
  const categoriesList = useAppSelector(selectCategoryList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        dispatch(categoryActions.fetchCategoryList(filter));
        const response: ListCategoryResponse<Category> = await categoryApi.getAllCategories(filter);
        
       // console.log('response: ', response);

        dispatch(categoryActions.fetchCategoryListSuccess(response));
      } catch (error) {
       // console.log('Failed to fetch product list: ', error);
        dispatch(categoryActions.fetchCategoryListFailed());
      }

    })();
  }, [dispatch, filter]);


  const filterProduct = useAppSelector(selectProductFilter);
  console.log('filterProduct: ', filterProduct)
  const loadingProduct = useAppSelector(selectProductLoading);
  const productList = useAppSelector(selectProductList);
  const pagination = useAppSelector(selectProductPagination);

  console.log('pagination:', pagination);

  useEffect(() => {
    (async () => {
      try {
        dispatch(productActions.fetchProductList(filterProduct));
        const response: ListResponse<Product> = await categoryApi.getProductByCategory(filterProduct);
        
        console.log('response product: ', response);

        dispatch(productActions.fetchProductListSuccess(response));
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
        dispatch(productActions.fetchProductListFailed());
      }

    })();
  }, [dispatch, filterProduct]);

  // console.log(categoriesList);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const newFilter: ListCategoryParams = {
      ...filter,
      slug: e.target.value || undefined,
    };
    dispatch(categoryActions.setFilter(newFilter))
  };

  const handleClearFilter = () => {
    const newFilter: ListCategoryParams = {
      ...filter,
      slug: undefined
    };

    dispatch(categoryActions.setFilter(newFilter))
  };

 
 // const location = useLocation();
  const pageNumber = !isNaN(Number(location.search.split("=")[1]))
  ? Number(location.search.split("=")[1])
  : 1;


  const handlePageChange = ({ selected }: { selected: number }) => {
    const currentPage =  selected + 1;
    const newFilter: ListParams = {
      ...filterProduct,
      page: currentPage || undefined,
    };

    // console.log('newFilter: ', selected);

    dispatch(productActions.setFilter(newFilter))
  };

  // const handlePageChange = ({ selected }) => {
  //   //setCurrentPage(selected + 1);
  //   console.log('selected: ', selected);
    
  //   navigate(`?page=${selected + 1}`, { replace: true })}
  // };

  return (
    <div className='column-main'>
      <div className='category'>
        <div className='sirebar'>
            <button className="btn-secondary" onClick={handleClearFilter}>
              Clear Filter
            </button>
              {categoriesList.length > 0 ?categoriesList.map((category) => (
                <ul key = {category.uuid}>
                  <li>
                    <input onChange={handleCategoryChange} name="category" value = {(category.slug as string).split('/')[(category.slug as string).split('/').length - 1]} id={category.uuid} type="radio"/>
                    <label htmlFor={category.uuid}>
                      {category.name}
                    </label>
                  </li>
                </ul>
              )): (<div> No children category found</div>) }
        </div>
        <div className='category-list'>
          {!isNil(productList) ? (
                  // productList.map((product) => (
                  // <ul key = {product.sku}>
                  //   <li>
                  //     <div className='product-item'>
                  //       <div className='product-media'>
                  //         <img src= { (product.image_url as string).split('product/')[(product.image_url as string).split('product/').length - 1] } alt="" />
                  //       </div>
                  //       <div className='product-info'>
                  //         <p className='product-name'>
                  //         {product.name}
                  //         </p>
                  //         <div className='product-sku'>
                  //           {product.sku}
                  //         </div>
                  //         <div className='product-sku'>
                  //           {product.price}
                  //         </div>
                  //         <div className='product-description'>
                  //           {product.badge_text}
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </li>
                  // </ul>
                  <>
                    <ProductsList productList={productList} />
                    <Pagination
                      initialPage={pageNumber - 1}
                      pagesCount={Math.ceil(pagination.totalRows / pagination.limit)}
                      onChange={handlePageChange}
                    />
                  </>
            ) : (
              <>
                <div> No product found</div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
