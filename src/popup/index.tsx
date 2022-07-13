import "../global.less";
import "windi.css";

import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import { Button, Input, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";

import Manage from "./pages/Manage";
import NotFound from "./pages/components/NotFound";
import NotLogin from "./pages/components/NotLogin";
import { RecoilRoot } from "recoil";
import SetPage from "./pages/Setting";
import Tool from "./pages/Tool";
import styles from "./index.module.less";
import { tabsOption } from "./sourceData";

import ReactDOM = require("react-dom");
import React = require("react");

const { TabPane } = Tabs;

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  // 判断显示内容
  const getTabsDom = (key: string) => {
    const domObj = {
      [tabsOption[0].key]: <Tool />,
      [tabsOption[1].key]: <Manage />,
      [tabsOption[2].key]: <SetPage />,
    };
    return domObj[key];
  };

  return (
    <div className="wd-w-362px wd-h-524px">
      <div className={styles.header}>
        <NavLink to={"tool"}>工具</NavLink>
        <NavLink to={"manage"}>管理</NavLink>
        <NavLink to={"set"}>设置</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/popup.html" element={<Popup />}>
            <Route index element={<Tool />}></Route>
            <Route path="tool" element={<Tool />}></Route>
            <Route path="manage" element={<Manage />}></Route>
            <Route path="set" element={<SetPage />}></Route>
            <Route path="notLogin" element={<NotLogin />}></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
