"use client";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Popover, message } from "antd";
import Modal from "antd/es/modal";
import MainLayout from "@/components/Layout/MainLayout";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useMakeTransaction } from "@/services/transactions";

const TransApp: React.FC = () => {
  const [destinatario, setDestinatario] = useState<string | undefined>();
  const [valor, setValor] = useState<number | undefined>();
  const [form] = Form.useForm();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [formattedValue, setFormattedValue] = useState<string>("");

  const onFinish = (values: any) => {
    confirm();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
    let formatted = "";
    for (let i = 0; i < numericValue.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formatted = "." + formatted; // Add a division point every three numbers
      }
      formatted = numericValue.charAt(numericValue.length - 1 - i) + formatted;
    }
    //setFormattedValue(formatted);
    form.setFieldsValue({ valor: formatted });
  };

  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `¿Estás seguro de realizar la transacción?`,
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        try {
          // Get form values
          const values = form.getFieldsValue();
          console.log({
            ...values,
            senderId: localStorage.getItem("id") as string,
          });

          const { remember, ...rest } = values;

          await useMakeTransaction(
            {
              ...rest,
              // transform amount into float
              amount: parseFloat(rest.amount.replace(/\./g, "")),
              senderId: localStorage.getItem("id") as string,
            },
            localStorage.getItem("token") as string
          );

          setSuccessMessageVisible(true);

          setTimeout(() => {
            setSuccessMessageVisible(false);
          }, 3000);
        } catch (error) {
          message.error("Error al realizar la transacción");
        }
      },
    });
  };

  const termsAndConditionsContent = (
    <div>
      <p>
        Términos y condiciones: Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Laudantium dolore
      </p>
    </div>
  );

  return (
    <div>
      <MainLayout>
        {successMessageVisible && (
          <div
            style={{
              background: "#52c41a",
              color: "white",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlined style={{ marginRight: "8px" }} />
            Transacción enviada
          </div>
        )}

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <h2> TRANSACCIONES</h2>
          <Form.Item
            label="Destinatario"
            name="receiverId"
            rules={[
              { required: true, message: "Por favor ingrese el destinatario!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Valor"
            name="amount"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el valor de la transacción",
              },
            ]}
          >
            <Input value={formattedValue} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            rules={[
              {
                required: true,
                message: "Debes aceptar los terminos y condiciones",
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject();
                },
              },
            ]}
          >
            <Checkbox>
              Acepto los{" "}
              <Popover
                content={termsAndConditionsContent}
                title="Terminos y condiciones"
                trigger="click"
              >
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  términos y condiciones
                </span>
              </Popover>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </MainLayout>
    </div>
  );
};

export default TransApp;
