"use client";
import React, { useState } from "react";
import { Tabs, Input, List, Button, Form, Modal, message,Space,InputNumber } from "antd";
import dynamic from "next/dynamic";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useSignUp } from "@/services/user";
import Head from "next/head";
const imagen = "/save.png"
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      const resp = await useSignUp(values);
      // login(resp.signInUser.token, {
      //     id: stringify(resp.signInUser.users.document),
      //     username: resp.signInUser.users.userLastName,
      //     role: "user",
      //   });
      localStorage.setItem("token", resp.signInUser.token);
      localStorage.setItem("id", resp.signInUser.users.document);
      localStorage.setItem("balance", resp.signInUser.users.balance);
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      Modal.error({content: "Incorrecto Registro"});
    }
  };
    const onFinishFailed = () => {
        Modal.error({
          title: "Registro fallido",
          content: "Respira profundamente e inténtalo de nuevo",
          cancelButtonProps: { style: { display: "none" } },
        });
      };
      const [isTranslated, setIsTranslated] = useState(true);
    
      const handleButtonClick = () => {
        setIsTranslated(!isTranslated);
      };

  return (
    <>
    <Head>
      <title>Registro</title>
    </Head>
    <div className="containerRegister">
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
          fill="#F7D59F"
          className="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#F4C479"
          className="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#E4B469"
          className="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
      </svg>
</div>
      <div className="mainContainerRegister">
        <div className="card shadow">
          <div className="card-body">
          <Button type="dashed" onClick={handleButtonClick}>¿ Eres una empresa ?</Button>
            <Form
              className="formRegister"
              //Detalles del Formulario
              layout="vertical"
              name="wrap"
              labelAlign="left"
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <Form.Item
                name="userName" //Label usuario
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese su nombre",
                  },
                ]}
              >
                <Input placeholder="Escribe tu nombre" />
              </Form.Item>
              <Form.Item
                name="userLastName"
                label="Apellido"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su apellido",

                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Escribe tu apellido" />
              </Form.Item>
              <Form.Item
                name="Document"
                label="Documento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su numero de identificación",

                  },
                ]}
                hasFeedback
              >
                <InputNumber maxLength={12} minLength={6}  style={{ width: "100%" }} placeholder="Escribe tu numero de identificacíon" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña",
                  },
                ]}
              >
                <Input.Password placeholder="Escribe tu contraseña" />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                label="Confirmar Contraseña"
                dependencies={["contraseña"]}
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese nuevamente su contraseña",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Confirma tu contraseña" />
              </Form.Item>
              <Form.Item>
                <Button  type="primary" htmlType="submit">
                  Registrarme
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={`infoContainer ${isTranslated ? 'translate' : ''}`}> 
          <Space direction="vertical" size="small" style={{ display: 'flex' }} align="center">
            <h1>Gusto en conocerte</h1>
            <img src={imagen} alt="Image" className="responsive" />
            <Space direction="horizontal" size="small" style={{ display: 'flex' }} >
            <span>¿Ya tienes cuenta?</span>
            <Link href="/login" className="url">
              Inicia Sesion
            </Link>
            </Space>
            </Space>
          </div>
          <Space direction="vertical" size="large" >
          <Button type="dashed" onClick={handleButtonClick}>¿ No eres una empresa ?</Button>
            <Form
              className="formRegister"
              //Detalles del Formulario
              layout="vertical"
              name="wrap"
              labelAlign="left"
              onFinishFailed={onFinishFailed}
              scrollToFirstError
            >
              <Form.Item
                name="username" //Label usuario
                label="Nombre de la empresa"
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese el nombre",
                  },
                ]}
              >
                <Input placeholder="Escribe el nombre del la empresa" />
              </Form.Item>
              <Form.Item
                name="nit"
                label="NIT"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el NIT",

                  },
                ]}
                hasFeedback
              >
                <InputNumber maxLength={15} minLength={8}  style={{ width: "100%" }} placeholder="Escribe tu numero de identificacíon" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña",
                  },
                ]}
              >
                <Input.Password placeholder="Escribe tu contraseña" />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                label="Confirmar Contraseña"
                dependencies={["contraseña"]}
                rules={[
                  {
                    required: true,
                    message: "Porfavor ingrese nuevamente su contraseña",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden!")
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Confirma tu contraseña" />
              </Form.Item>
              <Form.Item>
                <Button  type="primary" htmlType="submit" >
                  Registrarme
                </Button>
              </Form.Item>
            </Form>
            </Space>
        </div>
      </div>
    </div>
  </>
  );
};

// Dynamic export
export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});