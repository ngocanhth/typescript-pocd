import categoryApi from '@/api/categoryApi';
import { Category, ListResponse } from '@/models';
import { categoryActions, selectCategoryFilter, selectCategoryList, selectCategoryLoading } from '@/store/categorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

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

  return (
    <div className='column-main'>
      <div className='category'>
         {categoriesList.map((category) => (
          <ul key = {category.uuid}>
            <li>
              <input name="category" id={category.uuid} type="radio"/>
              <label htmlFor={category.uuid}>
                {category.name}
              </label>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
