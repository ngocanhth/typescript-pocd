import categoryApi from '@/api/categoryApi';
import Pagination from '@/components/Pagination';
import { Category, ListCategoryParams, ListCategoryResponse, ListParams, ListResponse, Product } from '@/models';
import { categoryActions, selectCategoryFilter, selectCategoryList, selectCategoryLoading } from '@/store/categorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { productActions, selectProductFilter, selectProductList, selectProductLoading, selectProductPagination } from '@/store/productSlice';
import isNaN from "lodash/isNaN";
import isNil from "lodash/isNil";
import queryString from 'query-string';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsList } from './components/ProductsList';
import { history } from '../../utils/history'

export interface ICategoryListProps {
}

export function CategoryList (props: ICategoryListProps) {
  // const [categories, setCategories] = useState([]);
  const filter = useAppSelector(selectCategoryFilter);
  const loading = useAppSelector(selectCategoryLoading);
  const categoriesList = useAppSelector(selectCategoryList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log('location: ', location );
  
  const params = queryString.parse(location.search);

   console.log('params: ', params);

  const queryParams = useMemo(() => {
    const params: any = queryString.parse(location.search);

    return {
      ...params,
     // slug: Number.parseInt(params.slug),
      page: Number.parseInt(params.page) || 1,
      sort: params.sort || 'default',
    };
  }, [location.search]);

  // console.log('queryParams: ', queryParams);

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
  // console.log('filterProduct: ', filterProduct)
  const loadingProduct = useAppSelector(selectProductLoading);
  const productList = useAppSelector(selectProductList);
  const pagination = useAppSelector(selectProductPagination);

  // console.log('pagination:', pagination);

  useEffect(() => {
    (async () => {
      try {
        dispatch(productActions.fetchProductList(filterProduct));
        const response: ListResponse<Product> = await categoryApi.getProductByCategory(filterProduct);
        
        // console.log('response product: ', response);

        dispatch(productActions.fetchProductListSuccess(response));
      } catch (error) {
        // console.log('Failed to fetch product list: ', error);
        dispatch(productActions.fetchProductListFailed());
      }

    })();
  }, [dispatch, filterProduct]);

  // console.log(categoriesList);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    const newFilter: ListCategoryParams = {
      ...filter,
      slug: e.target.value || undefined,
    };

    const newFilterProduct: ListParams = {
      ...queryParams,
      slug: e.target.value || undefined,
    };

    // console.log('newFilter: ', selected);

    dispatch(productActions.setFilter(newFilterProduct));
    dispatch(categoryActions.setFilter(newFilter));

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilterProduct),
    });
  };

  const handleClearFilter = () => {
    const newFilter: ListCategoryParams = {
      ...filter,
      slug: undefined
    };

    const newFilterProduct: ListParams = {
      ...queryParams,
      page: 1,
      slug: undefined,
      sort: undefined
    };

    dispatch(categoryActions.setFilter(newFilter));
    dispatch(productActions.setFilter(newFilterProduct));
  };

 
 // const location = useLocation();
  const pageNumber = !isNaN(Number(location.search.split("=")[1]))
  ? Number(location.search.split("=")[1])
  : 1;

  const handlePageChange = ({ selected }: { selected: number }) => {
    const currentPage =  selected + 1;
    const newFilter: ListParams = {
      ...queryParams,
      page: currentPage || undefined,
    };

    // console.log('newFilter: ', selected);

    dispatch(productActions.setFilter(newFilter));
    // navigate(`?page=${selected + 1}`, { replace: true })}
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    const newSort = e.target.value;
    // console.log('newSort: ', newSort);
    const newFilter: ListParams = {
      ...queryParams,
      sort: newSort
    };

    dispatch(productActions.setFilter(newFilter));

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  };


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
                  <>
                  <select
                    value={filterProduct.sort ? `${filterProduct.sort}` : ''}
                    onChange={handleSortChange}
                  >
                    <option value="default">
                      Default
                    </option>
                    <option value="price-low-high">Price - Low to High</option>
                    <option value="price-high-low">Price - High to Low</option>
                    <option value="name-a-z">Name - A to Z</option>
                    <option value="name-z-a">Name - Z to A</option>
                  </select>
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
