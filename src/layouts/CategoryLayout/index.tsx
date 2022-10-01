import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, SideBar } from '../components';

export interface DefaultLayoutProps {
}

export function CategoryLayout (props: DefaultLayoutProps) {
  return (
    <div className='pagge-wrapper'>
      <Header/>
      <main className='page-main'>
        <SideBar/>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
