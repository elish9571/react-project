import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserHomePage from './components/user/UserHomePage'
import Admin from './components/admin/Admin'
import Services from './components/service/Services'
import ListOfOrders from './components/lists/ListOfOrders'

// import Meetings from './components/services/Meetings'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserHomePage />
    
  },
  {
    path:"/admin",
    element: <Admin />,
    errorElement:<div>Error Admin</div>,
    children: [
      {
        path:'',
        element:<div></div>
      },
      {
        path: 'services',
        element: <Services/>,
        errorElement: <div>Error contant not found!</div>
      },
      {
        path: 'meetings',
        element: <ListOfOrders/>,
        errorElement: <div>Error contant not found!</div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)