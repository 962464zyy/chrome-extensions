// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import { Button, Input, Tabs, Typography } from "antd";
import "../global.less";
import "windi.css";
import { useEffect, useState } from "react";
import ReactDOM = require("react-dom");
import React = require("react");
import { tabsOption } from "./sourceData";
import styles from "./index.module.less";
import Tool from "./pages/Tool";
import Manage from "./pages/Manage";
import SetPage from "./pages/Setting";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";
import NotLogin from "./pages/components/NotLogin";
import NotFound from "./pages/components/NotFound";
const { Link } = Typography;

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
  </React.StrictMode>,
  document.getElementById("root")
);
