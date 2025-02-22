import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import Main from './components/Main/Main';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import TaskBoard from './components/TaskBoard/TaskBoard';
import AddTask from './pages/AddTask/AddTask';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <h1 className='text-5xl font-bold font-serif text-red-500'>Page is not found</h1>,
    children: [
      {
        path: "/",
        element: <Home>
        </Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "add-task",
        element: <AddTask></AddTask>
      },
      {
        path: "manage-task",
        element: <PrivateRoute><TaskBoard></TaskBoard></PrivateRoute>
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer></ToastContainer>
  </StrictMode>,
)
