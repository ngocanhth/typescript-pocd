import * as React from 'react';

export interface PaginationProps {
    // count={Math.ceil(pagination._totalRows / pagination._limit)}
    // page={pagination?._page}
    // onChange={handlePageChange}
    count: number;
    page: number;
    onChange: (e: any, page: number) => void;
}

export function Pagination ({count, page, onChange}: PaginationProps) {
  return (
    <div className='pagination-wrapper'>
      <ul className='pager'>
        <li className='previous'>
            Previous
        </li>
            {/* let page=3;
            for (let i = 1; i <= page; i++) {
             <li className='page'>
                <a href="">
                    <span>
                    {i}
                    </span>
                </a>
             </li>

            } */}

  
        <li className='next'>
            Next
        </li>
      </ul>
    </div>
  );
}
