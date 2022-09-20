import { DefaultLayout } from "@/layouts/DefaultLayout";
import { LeftSidebarLayout } from "@/layouts/LeftSidebarLayout";
import { LoginPage, RegisterPage } from "@/pages/Auth";
import { CategoryList } from "@/pages/Category";
import HomePage from "@/pages/Home";
import { AccountDetail, OrderList } from "@/pages/MyAccount";
import { PageNotFound } from "@/pages/PageNotFound";
import Styleguides from "@/pages/Styleguides";
import { ReactElement } from "react";

export interface CustomRoutes {
  path?: string;
  element: ReactElement;
  isAuth?: boolean;
  index?: boolean;
  children?: CustomRoutes[];
}

export const RouteList: CustomRoutes[] = [
  // -----------  Home -----------
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },

  // ----------- Auth  -----------
  {
    path: "login",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      }
    ],
  },

  {
    path: "logout",
    isAuth: true,
    element: <LoginPage />,
  },

  {
    path: "register",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      }
    ],
  },

  // ----------- My Account  -----------
  {
    path: "dashboard",
    element: <LeftSidebarLayout />,
    isAuth: true,
    children: [
      {
        index: true,
        element: <AccountDetail />,
      },
      {
        path: "search",
        element: <OrderList />,
      },
    ],
  },
  {
    path: "styleguides",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Styleguides />,
      },
    ]
  },
  {
    path: "shop",
    element: <LeftSidebarLayout />,
    children: [
      {
        index: true,
        element: <CategoryList />,
      },
    ]
  },
  {
    path: "*",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <PageNotFound />,
      },
    ]
  }
];
