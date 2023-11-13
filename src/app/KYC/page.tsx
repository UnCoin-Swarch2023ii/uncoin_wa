"use client";
import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, message } from "antd";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";

const ModKycApp: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const { correo } = values;

    // Validate the presence of two images
    if (fileList.length !== 2) {
      message.error("Por favor, cargue dos imágenes.");
      return;
    }
    // If everything is valid, you can proceed with your action
    // For example, you can log a success message
    console.log("Validation successful!");

    // You can close the modal or perform other actions as needed
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Identificarse
      </Button>
      <Modal
        title="Validar Identidad"
        open={open}        
        onCancel={hideModal}        
        cancelText="Cancelar"
        okButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <p>
            En esta ventana usted podrá subir dos imagenes, la primera
            corresponde a su CC y la segunda una foto de su rostro. Dichas
            imagenes serán comparadas para realizar la respectiva verificación.
            Esta acción es fundamental para realizar la creación de su cuenta.
          </p>
          <ImgCrop rotationSlider>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 2 && "+ Upload image " + fileList.length}
            </Upload>
          </ImgCrop>
          <Form
            name="validationForm"
            onFinish={onFinish}
          >
            <Form.Item
              name="correo" //Label correo
              label="Correo"
              rules={[
                {
                  required: true,
                  message: "Porfavor ingrese su correo",
                },
                {
                  type: "email",
                  message: "Por favor ingrese un correo electrónico válido",
                },
              ]}
            >
              <Input placeholder="Ingrese su correo" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Validar identidad
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModKycApp;
