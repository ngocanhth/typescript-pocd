import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, SideBar } from '../components';

export interface DefaultLayoutProps {
}

export function LeftSidebarLayout (props: DefaultLayoutProps) {
  return (
    <div>
      <Header/>
      <SideBar/>
        <Outlet />
      <Footer/>
    </div>
  );
}
