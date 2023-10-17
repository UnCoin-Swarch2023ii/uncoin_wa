"use client";
import React, { useState, useEffect } from "react";
import { Statistic, Button, Col, Row, ConfigProvider, theme } from "antd";
import dynamic from "next/dynamic";
import MainLayout from "@/components/Layout/MainLayout";
import {
  ContainerTwoTone,
  InteractionTwoTone,
  ProfileTwoTone,
} from "@ant-design/icons";
import { getUser } from "@/services/user";
import Link from "next/link";
const Page = () => {
  const [balance, setBalance] = useState(localStorage.getItem("balance"));
  const getData = async () => {
    console.log(localStorage.getItem("token"));
    //const resp = await getUser(localStorage.getItem("token"),+(localStorage.getItem("id") as string));
    //console.log(resp);
    //setBalance(resp.data.data.getUser.balance);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <MainLayout>
      <ConfigProvider
        theme={{
          components: {
            Statistic: { contentFontSize: 60, titleFontSize: 20 },
          },
        }}
      >
        <div className="mainContainer">
          <Statistic
            className="balance"
            title="Saldo"
            //@ts-ignore
            value={balance}
            precision={2}
          />

          <Button className="updateButton">
            Actualizar
            {/* <RedoOutlined /> */}
          </Button>
        </div>
        <div style={{ padding: "90px 100px" }}>
          <Row>
            <Col className="col" xs={8} sm={8} md={8} lg={8} xl={8}>
              <Link href="/list">
                <ProfileTwoTone className="icon" twoToneColor="#F2BC66" />
                Lista de movimientos
              </Link>
            </Col>
            <Col className="col" xs={8} sm={8} md={8} lg={8} xl={8}>
              <Link href="/transactions">
                <InteractionTwoTone className="icon" twoToneColor="#F2BC66" />
                Transacciones
              </Link>
            </Col>
            <Col className="col" xs={8} sm={8} md={8} lg={8} xl={8}>
              <Link href="/billing">
                <ContainerTwoTone className="icon" twoToneColor="#F2BC66" />
                Facturas
              </Link>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </MainLayout>
  );
};

// Dynamic export
export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
