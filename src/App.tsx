import { useState } from 'react'
import { 
  Routes,
  unstable_HistoryRouter as HistoryRouter,
 } from 'react-router-dom'
import { CustomRoutes, RouteList } from './routes/index'
import { RecursiveRoute } from './routes/recursive-route'
import { history } from './utils/history'

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        {RouteList.map((route: CustomRoutes) => RecursiveRoute(route))}
      </Routes>
    </HistoryRouter>
  )
}

export default App
