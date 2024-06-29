import { Outlet, useLocation } from 'react-router-dom';
import { Menu as AntdMenu, MenuProps } from 'antd';
import './index.css';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { router } from '../..';

const items: MenuProps['items'] = [
  {
    key: '/meeting_room_manage',
    label: '会议室管理',
  },
  {
    key: '/booking',
    label: '会议室预定',
    children: [
      {
        key: '/booking/booking_manage',
        label: '预定管理',
      },
      {
        key: '/booking/booking_history',
        label: '预定历史',
      },
    ],
  },
  {
    key: '/user_manage',
    label: '用户管理',
  },
  {
    key: '/statistics',
    label: '统计',
  },
];

const handleMenuItemClick = (info: ItemType) => {
  if (info?.key) router.navigate(info.key as string);
};

export function Menu() {
  const location = useLocation();

  function getSelectedKeys() {
    if (location.pathname === '/user_manage') {
      return ['3'];
    } else if (location.pathname === '/booking/booking_history') {
      return ['2.1'];
    } else if (location.pathname === '/booking/booking_manage') {
      return ['2'];
    } else if (location.pathname === '/meeting_room_manage') {
      return ['1'];
    } else if (location.pathname === '/statistics') {
      return ['4'];
    } else {
      return ['1'];
    }
  }

  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          defaultSelectedKeys={getSelectedKeys()}
          items={items}
          mode="inline"
          onClick={handleMenuItemClick}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
