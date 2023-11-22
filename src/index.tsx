import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { UpdatePassword } from './pages/updatePassword';
import { ErrorPage } from './pages/errorPage';

const routes = [
  {
    path: '/',
    element: <div>index</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'update_password',
    element: <UpdatePassword />,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<RouterProvider router={router} />);
