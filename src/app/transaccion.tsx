"use client";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Popover, message } from "antd";
import Modal from "antd/es/modal";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const TransApp: React.FC = () => {
  const [destinatario, setDestinatario] = useState<string | undefined>();
  const [valor, setValor] = useState<number | undefined>();
  const [form] = Form.useForm();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [formattedValue, setFormattedValue] = useState<string>("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setDestinatario(values.destinatario);
    setValor(values.valor);
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

  useEffect(() => {
    // Call the confirm function when destinatario or valor changes
    if (destinatario !== undefined && valor !== undefined) {
      confirm();
    }
  }, [destinatario, valor]);

  const confirm = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Está seguro que desea enviar ${valor} a ${destinatario}?`,
      okText: "Sí",
      cancelText: "No",
      onOk: () => {
        form.resetFields();
        // Show the success message
        setSuccessMessageVisible(true);
        // Hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      },
    });
  };

  const termsAndConditionsContent = (
    <div>
      <p>Terminos y condiciones: blablabla</p>
    </div>
  );

  return (
    <div>
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
          name="destinatario"
          rules={[
            { required: true, message: "Por favor ingrese el destinatario!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Valor"
          name="valor"
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
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
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
    </div>
  );
};

export default TransApp;
