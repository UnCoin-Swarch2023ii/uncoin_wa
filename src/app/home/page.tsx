"use client";
import React, { useState,useEffect } from "react";
import { Statistic, Button , Col, Row, ConfigProvider, theme} from "antd";
import dynamic from "next/dynamic";
import MainLayout from "@/components/Layout/MainLayout";
import {ContainerTwoTone, InteractionTwoTone, ProfileTwoTone } from "@ant-design/icons";
import {getUser} from "@/services/user";
const Page = () => {
  const [balance, setBalance] = useState(localStorage.getItem("balance"));
  const getData = async () => {
    console.log(localStorage.getItem("token"));
    //const resp = await getUser(localStorage.getItem("token"),+(localStorage.getItem("id") as string));
    //console.log(resp);
    //setBalance(resp.data.data.getUser.balance);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <MainLayout>
      <ConfigProvider
        theme={{
          components: {
            Statistic: { contentFontSize: 60, titleFontSize:20 },
          },
        }}
      >
        <div className="mainContainer">
            <Statistic 
              className="balance"
                title="Saldo"
                value={balance ?? 0}
              precision={2}/>
            
            <Button className="updateButton" >
              Actualizar
              {/* <RedoOutlined /> */}
            </Button>
          
        </div>
        <div style={{ padding: "0px 100px", paddingBottom: "90px" }}>
          <Row>
            <Col className="col" xs={8} sm={8} md={8} lg={8} xl={8}>
              <a className="iconButton" href="/list/1">
                <ProfileTwoTone className="icon" twoToneColor="#F2BC66" />
                Lista de movimientos
              </a>
            </Col>
            <Col className="col" xs={8} sm={8} md={8} lg={8} xl={8}>
              <a href="/transactions">
                  <InteractionTwoTone className="icon" twoToneColor="#F2BC66" />
                  Transacciones
              </a>
            </Col>
            <Col className="col" xs={8} sm={8} md={8} lg={8} xl={8}>
              <a className="iconButton" href="/billing">
                <ContainerTwoTone className="icon" twoToneColor="#F2BC66" />
                Facturas
              </a>
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