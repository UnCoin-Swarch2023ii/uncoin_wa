"use client";
import React, { useState } from "react";
import { Tabs, Input, List, Button, Form, Modal, message,Space,InputNumber } from "antd";
import dynamic from "next/dynamic";
import MainLayout from "@/components/Layout/MainLayout";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
const { Search } = Input;
import Head from "next/head";
const imagen = "/possible1.png"
const Page = () => {
    const onFinishFailed = () => {
        Modal.error({
          title: "Inicio de sesión fallido",
          content: "Respira profundamente e inténtalo de nuevo",
          cancelButtonProps: { style: { display: "none" } },
        });
      };
      const [isTranslated, setIsTranslated] = useState(true);
    
      const handleButtonClick = () => {
        setIsTranslated(!isTranslated);
      };

  return (
    <div className="containerLogin">
      
      <style>
  @import url('https://fonts.googleapis.com/css2?family=Lora&family=Montserrat&family=Playfair+Display:ital@0;1&family=Poppins&display=swap');
</style>
<div className="svgcontainer">
<svg
        preserveAspectRatio="xMidYMid slice"
        viewBox="10 10 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#3EC0B8"
          className="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#6ED0CA"
          className="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#277873"
          className="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
      </svg>

      </div>
      <Head>
        <title>Inicio de Sesión</title>
      </Head>
      <div className="mainContainerLogin">
        <div className="card shadow">
        <Space direction="vertical" size="large" >
        <h1>Bienvenido de nuevo </h1>
        <Button type="dashed" onClick={handleButtonClick}>¿ Eres una empresa ?</Button>
          <Form
            className="formLogin"
            layout="vertical"
            wrapperCol={{ span: 24 }}
            //onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
  
                 
            <Form.Item
              name="documento"
              label="Documento"
              rules={[
                { required: true, message: "Porfavor ingrese su documento" },
              ]}
            >
              <InputNumber maxLength={12} minLength={6} style={{ width: "100%" }}/>
            </Form.Item>
            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: "Porfavor ingrese su contraseña" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
          </Space>
          <div className={`infoContainer ${isTranslated ? 'translate' : ''}`}>    
          <Space direction="vertical" size="small" style={{ display: 'flex' }} align="center">
              <img src={imagen} alt="Image" className="responsive" />
              <Space direction="horizontal" size="small" style={{ display: 'flex' }} >
              <span>¿No tienes cuenta?</span>
              <Link href="/register" className="url">
                Regístrate
              </Link>
              </Space>
              </Space>
          </div>
          <Space direction="vertical" size="large" >
          <h1>Bienvenido de nuevo </h1>
          <Button type="dashed" onClick={handleButtonClick}>¿ No eres una empresa ?</Button>
          <Form
            className="formLogin"
            layout="vertical"
            wrapperCol={{ span: 24 }}
            //onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
   
            <Form.Item
              name="nit"
              label="NIT"
              rules={[
                { required: true, message: "Porfavor ingrese su nit" },
              ]}
            >
              <InputNumber maxLength={16} minLength={8} style={{ width: "100%" }}/>
            </Form.Item>
            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: "Porfavor ingrese su contraseña" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
          </Space>
          {/* <div className="gallery">
            <div className="pic" id="picLogin" />
          </div> */}
        
        </div>

      </div>
    </div>
  );
};

// Dynamic export
export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});