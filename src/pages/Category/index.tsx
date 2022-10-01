import categoryApi from '@/api/categoryApi';
import { Category, ListCategoryParams, ListResponse } from '@/models';
import { categoryActions, selectCategoryFilter, selectCategoryList, selectCategoryLoading } from '@/store/categorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ChangeEvent, useEffect } from 'react';

export interface ICategoryListProps {
}

export function CategoryList (props: ICategoryListProps) {
  // const [categories, setCategories] = useState([]);
  const filter = useAppSelector(selectCategoryFilter);
  const loading = useAppSelector(selectCategoryLoading);
  const categoriesList = useAppSelector(selectCategoryList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(categoryActions.fetchCategoryList(filter));
        const response: ListResponse<Category> = await categoryApi.getAllCategories(filter);
        
        console.log('response: ', response);

        dispatch(categoryActions.fetchCategoryListSuccess(response));
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
        dispatch(categoryActions.fetchCategoryListFailed());
      }

    })();
  }, [dispatch, filter]);

  console.log(categoriesList);

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

  return (
    <div className='column-main'>
      <div className='category'>
          <button onClick={handleClearFilter}>
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
    </div>
  );
}
