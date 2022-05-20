// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import { Tabs, Typography } from "antd";
import "../global.less";
import "windi.css";
import { useEffect, useState } from "react";
import ReactDOM = require("react-dom");
import React = require("react");
import { tabsOption } from "./sourceData";
import styles from "./index.module.less";
const { Link } = Typography;

const { TabPane } = Tabs;

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  // 判断显示内容
  const getTabsDom = (key: string) => {
    const domObj = {
      [tabsOption[0].key]: (
        <div className={styles.g_flex}>
          <Link href="https://www.newrank.cn/" title="新榜">
            新榜
          </Link>
          <Link href="https://www.baidu.com/" title="百度">
            百度
          </Link>
          <Link href="https://lpl.qq.com/" title="lol">
            lol
          </Link>
          <Link href="https://zh.javascript.info/" title="js教程">
            js教程
          </Link>
        </div>
      ),
      [tabsOption[1].key]: <div>管理</div>,
      [tabsOption[2].key]: <div>设置</div>,
    };
    return domObj[key];
  };

  return (
    <div className="wd-w-362px wd-h-524px">
      <div>
        <Tabs centered>
          {tabsOption.map((item: any) => (
            <TabPane tab={item.label} key={item.key}>
              {getTabsDom(item.key)}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

console.log(document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
