import * as React from 'react';
import { Link } from 'react-router-dom';

export interface PageNotFoundProps {
}

export function PageNotFound (props: PageNotFoundProps) {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/">Back to homepage</Link>
    </div>
  );
}
