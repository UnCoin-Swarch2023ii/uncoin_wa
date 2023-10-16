import type { Metadata } from "next";
import "../styles/styles.scss";
import { ConfigProvider, theme } from "antd";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import AuthProvider from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "UnCoin",
  description: "Generated by create next app",
  icons: {
    icon: '/icon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
            "token": {
              "colorPrimary": "#D99983",
              "colorError": "#da090c",
              "colorInfo": "#13C2C2",
              "colorLink": "#d89b86"
            },
            "components": {
              "Menu": {
                "darkItemBg": "#277873",
                "colorPrimary": "#3EC0B8",
                //"darkItemColor": "#D57116"
              },
              "Select": {
                "controlItemBgActive": "#e6f4ff"
              },
              "Dropdown": {
                "colorPrimary": "#2b3467",
                "colorPrimaryBorder": "#bad7e9",
                "controlItemBgActive": "#cfe0ea",
                "controlItemBgActiveHover": "#b5c9d6"
              }
            }
        }}
      >
     
      <body style={{ margin: 0 }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
      </ConfigProvider>
    </html>
  );
}
