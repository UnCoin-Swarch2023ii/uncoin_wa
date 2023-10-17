import React from "react";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import {
  HomeOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('Inicio', "/home", <HomeOutlined />),
  getItem('Movimientos', "/list"),
  getItem('Salir', '3', <PoweroffOutlined />),
];
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
        <div />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
        />
      <Content style={{ padding: "20px 50px" }}>
        <div
          style={{ padding: "10px", background: "#fff", borderRadius: "8px" }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Creado por UnCoin Team ©2023, Universidad Nacional de Colombia sede
        Bogotá
      </Footer>
    </Layout>
  );
};

export default MainLayout;
