import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { UpdatePassword } from './pages/updatePassword';
import { ErrorPage } from './pages/errorPage';
import { Home } from './pages/home';
import { UpdateInfo } from './pages/update_info';
import { Menu } from './pages/Menu';
import { UserManage } from './pages/userManage';
import { ModifyMenu } from './pages/ModifyMenu';
import { InfoModify } from './pages/InfoModify';
import { PasswordModify } from './pages/PasswordModify';

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu />,
        children: [
          {
            path: 'user_manage',
            element: <UserManage />
          },
          {
            path: 'update_info',
            element: <UpdateInfo />,
          },
        ]
      },
      {
        path: "/user",
        element: <ModifyMenu />,
        children: [
          {
            path: "info_modify",
            element: <InfoModify />
          },
          {
            path: "password_modify",
            element: <PasswordModify />
          }
        ]
      }
    ],
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
export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<RouterProvider router={router} />);
