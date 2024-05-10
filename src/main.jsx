import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import TrainingList from './components/TrainingList.jsx';
import CustomerList from './components/CustomerList.jsx';
import Error from './components/Error.jsx'
import CalendarPage from './components/CalendarPage.jsx';
import StatisticsPage from './components/StatisticsPage.jsx'

const router = createHashRouter([  
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [                       
      {
        path: "/customers",
        element: <CustomerList />,
        index: true,                  
      }
    ]
  },
  {
    path: "/trainings",
    element: <App />,
    errorElement: <Error />,
    children: [                       
      {
        element: <TrainingList />,
        index: true,                  
      }
    ]
  },
  {
    path: "/calendar",
    element: <App />,
    errorElement: <Error />,
    children: [                       
      {
        element: <CalendarPage />,
        index: true,                  
      }
    ]
  },
  {
    path: "/statistics",
    element: <App />,
    errorElement: <Error />,
    children: [                       
      {
        element: <StatisticsPage />,
        index: true,                  
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)