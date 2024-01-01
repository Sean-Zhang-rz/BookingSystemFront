import { Outlet, Router, useLocation } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from 'antd';
import './index.css';
import { router } from "../..";
import { ItemType } from "antd/es/menu/hooks/useItems";

const items: MenuProps['items'] = [
  {
    key: '/user/info_modify',
    label: "信息修改",
  },
  {
    key: '/user/password_modify',
    label: "密码修改"
  }
];
const handleMenuItemClick = (info: ItemType) => {
  if (info?.key) router.navigate(info.key as string)
}
export function ModifyMenu() {
  const location = useLocation()
  return <div id="menu-container">
    <div className="menu-area">
      <AntdMenu
        defaultSelectedKeys={[location.pathname]}
        items={items}
        onClick={handleMenuItemClick}
      />
    </div>
    <div className="content-area">
      <Outlet></Outlet>
    </div>
  </div>
}
