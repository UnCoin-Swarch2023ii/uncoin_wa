"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Input, List } from "antd";
import dynamic from "next/dynamic";
import MainLayout from "@/components/Layout/MainLayout";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { useGetTransactionsByUserId } from "@/services/transactions";
import { useGetShipmentsByUser } from "@/services/billing";

const { Search } = Input;

const Page = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [searchText, setSearchText] = useState("");
  const [listDataTransactions, setListDataTransactions] = useState([
    {
      id: 1,
      title: "Paypal",
      description: "07/10/2023",
      type: "entry",
    },
    {
      id: 2,
      title: "Sergio Sánchez",
      description: "07/10/2023",
      type: "exit",
    },
    {
      id: 3,
      title: "Sara Sánchez",
      description: "07/10/2023",
      type: "entry",
    },
  ]);

  const [listDataBilling, setListDataBilling] = useState([
    { id: 1, title: "Factura 1", description: "07/10/2023" },
    { id: 2, title: "Factura 2", description: "07/10/2023" },
    { id: 3, title: "Factura 3", description: "07/10/2023" },
    // Add more items as needed
  ]);

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const handleSearch = (value: any) => {
    setSearchText(value);
  };

  const filteredListTransactions = listDataTransactions.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredListBilling = listDataBilling.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const getDataTransactions = async () => {
    try {
      const dataTransactions = await useGetTransactionsByUserId(
        "651f60db3917ba6117d07caf",
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTYiLCJleHAiOjE2OTc0NTIyODIsImlhdCI6MTY5NzQxNjI4Mn0.2qkQCQ19z6Htp9v07aqxGeyTxvvH7dMH422mWYE8q-Q"
      );
      setListDataTransactions(dataTransactions);
    } catch (error) {
      // console.log(error);
    }
  };

  const getDataBilling = async () => {
    try {
      const dataShipments = await useGetShipmentsByUser(
        "651f60db3917ba6117d07caf",
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTYiLCJleHAiOjE2OTc0NTIyODIsImlhdCI6MTY5NzQxNjI4Mn0.2qkQCQ19z6Htp9v07aqxGeyTxvvH7dMH422mWYE8q-Q"
      );

      setListDataBilling(dataShipments);
    } catch (error) {
      // console.log(error);
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
                  renderItem={(item) => (
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
                          avatar={
                            item.type === "entry" ? (
                              <UpCircleOutlined
                                style={{
                                  fontSize: "16px",
                                  // Green
                                  color: "#52c41a",
                                }}
                              />
                            ) : (
                              <DownCircleOutlined
                                style={{
                                  fontSize: "16px",
                                  // Red
                                  color: "#f5222d",
                                }}
                              />
                            )
                          }
                          title={item.title}
                          description={item.description}
                        />
                        <div>100 USD</div>
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
                  renderItem={(item) => (
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
