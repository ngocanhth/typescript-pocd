import * as React from 'react';
import TopSlider from './components/TopSlider';

export interface IHomePageProps {
}

export default function HomePage (props: IHomePageProps) {
  return (
    <div>
       <TopSlider/>
    </div>
  );
}
