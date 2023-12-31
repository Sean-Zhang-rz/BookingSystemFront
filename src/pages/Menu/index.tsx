import { Outlet } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from 'antd';
import './index.css';
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { router } from "../..";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: "会议室管理"
  },
  {
    key: '2',
    label: "预定管理"
  },
  {
    key: 'user_manage',
    label: "用户管理"
  },
  {
    key: '4',
    label: "统计"
  }
];

const handleMenuItemClick = (info: ItemType) => {
  if (info?.key) router.navigate(info.key as string)
}

export function Menu() {
  return <div id="menu-container">
    <div className="menu-area">
      <AntdMenu
        defaultSelectedKeys={['3']}
        items={items}
        onClick={handleMenuItemClick}
      />
    </div>
    <div className="content-area">
      <Outlet></Outlet>
    </div>
  </div>
}
