import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;

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
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              label: "Inicio",
            },
            {
              key: "2",
              label: "Movimientos",
            },
          ]}
        />
      </Header>
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
