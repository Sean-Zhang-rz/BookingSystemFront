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
import { MeetingRoomManage } from './pages/MeetingRoomManage/MeetingRoomManage';
import { BookingManage } from './pages/BookingManage/BookingManage';
import { Statistics } from './pages/Statistics/Statistics';
import { BookingHistory } from './pages/BookingManage/BookingHistory';

const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Menu />,
        children: [
          {
            path: 'user_manage',
            element: <UserManage />,
          },
          {
            path: 'update_info',
            element: <UpdateInfo />,
          },
          {
            path: 'meeting_room_manage',
            element: <MeetingRoomManage />,
          },
          {
            path: 'booking',
            element: <Menu />,
            children: [
              {
                path: 'booking_manage',
                element: <BookingManage />,
              },
              {
                path: 'booking_history',
                element: <BookingHistory />,
              },
            ],
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
        ],
      },
      {
        path: '/user',
        element: <ModifyMenu />,
        children: [
          {
            path: 'info_modify',
            element: <InfoModify />,
          },
          {
            path: 'password_modify',
            element: <PasswordModify />,
          },
        ],
      },
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
