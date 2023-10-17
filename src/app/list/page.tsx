"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Input, List } from "antd";
import dynamic from "next/dynamic";
import MainLayout from "@/components/Layout/MainLayout";
import {
  DoubleRightOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { useGetTransactionsByUserId } from "@/services/transactions";
import { useGetShipmentsByUser } from "@/services/billing";

const { Search } = Input;

const Page = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [searchText, setSearchText] = useState("");
  const [listDataTransactions, setListDataTransactions] = useState([]);

  const [listDataBilling, setListDataBilling] = useState([]);

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const handleSearch = (value: any) => {
    setSearchText(value);
  };

  const filteredListTransactions = listDataTransactions.filter(
    (item: any) =>
      item.receiverId.toLowerCase().includes(searchText.toLowerCase()) ||
      item.senderId.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredListBilling = listDataBilling.filter((item: any) => item);

  const getDataTransactions = async () => {
    try {
      const dataTransactions = await useGetTransactionsByUserId(
        localStorage.getItem("id") as string,
        localStorage.getItem("token") as string
      );
      setListDataTransactions(dataTransactions);
    } catch (error) {
      // console.log(error);
    }
  };

  const getDataBilling = async () => {
    try {
      const dataShipments = await useGetShipmentsByUser(
        localStorage.getItem("id") as string,
        localStorage.getItem("token") as string
      );

      setListDataBilling(dataShipments);
    } catch (error) {
      setListDataBilling([]);
    }
  };

  useEffect(() => {
    getDataTransactions();
    getDataBilling();
  }, []);

  return (
    <MainLayout>
      <Tabs
        activeKey={activeTab}
        centered
        onChange={handleTabChange}
        items={[
          {
            key: "transactions",
            label: "Transacciones",
            children: (
              <div>
                <Search
                  placeholder="Buscar transacciones"
                  onSearch={handleSearch}
                  style={{ marginBottom: 16 }}
                />
                <List
                  itemLayout="horizontal"
                  dataSource={filteredListTransactions}
                  renderItem={(item: any) => (
                    <List.Item>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          padding: "0 24px",
                        }}
                      >
                        <List.Item.Meta
                          title={
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <p>
                                {item.senderId
                                  ? item.senderId
                                  : "No encontrado"}
                              </p>
                              {/* Antd right arrow icon */}
                              <DoubleRightOutlined
                                style={{
                                  margin: "0 8px",
                                  color: "#F2BC66",
                                }}
                              />
                              <p>
                                {item.receiverId
                                  ? item.receiverId
                                  : "No encontrado"}
                              </p>
                            </div>
                          }
                          description={item.description}
                        />
                        <div>{item.amount} USD</div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            ),
          },
          {
            key: "billing",
            label: "Facturas",
            children: (
              <div>
                <Search
                  placeholder="Buscar facturas"
                  onSearch={handleSearch}
                  style={{ marginBottom: 16 }}
                />
                <List
                  itemLayout="horizontal"
                  dataSource={filteredListBilling}
                  renderItem={(item: any) => (
                    <List.Item className="listItemCentered">
                      <List.Item.Meta
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            ),
          },
        ]}
      />
    </MainLayout>
  );
};

// Dynamic export
export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
