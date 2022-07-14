import { FC, useEffect, useState } from "react";

import { Button } from "antd";
import Link from "antd/lib/typography/Link";
import styles from "./index.module.less";

type Props = {};
export interface linkListType {
  href: string;
  children: string;
}

const Tool = (props: Props) => {
  const [limit, setLimit] = useState<number>(0);
  const [contextMenusIndex, setContextMenusIndex] = useState<number>(1);

  document.addEventListener("DOMContentLoaded", function () {
    console.log("我被执行了！tool");
  });

  useEffect(() => {
    // @ts-ignore
    chrome.storage.local.get(["limit"], (o: any) => {
      console.log(o);
      setLimit(o.limit);
    });
  }, []);
  const sendNotifyOptions = () => {
    const notifyOptions = {
      // type: basic image simple list
      type: "basic",
      title: "该喝药了",
      // iconUrl:
      //   "https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png",
      /** 打包后的路径 */
      iconUrl: "../icons/logo.png",
      message: "该喝药了，大朗",
    };
    console.log(notifyOptions);
    // @ts-ignore
    chrome.notifications.create("drinkNotify", notifyOptions);
  };
  const linkList: linkListType[] = [
    {
      href: "https://www.baidu.com/",
      children: "百度",
    },
    {
      href: "https://www.douyu.com/",
      children: "斗鱼",
    },
    {
      href: "https://www.huya.com/",
      children: "虎牙",
    },
    {
      href: "https://lpl.qq.com/",
      children: "lpl",
    },
  ];

  const handleContextMenus = () => {
    setContextMenusIndex(contextMenusIndex + 1);
    // console.log(chrome.contextMenus);
    // @ts-ignore
    // chrome.contextMenus.create({
    //   title: "测试右键菜单" + contextMenusIndex,
    //   id: contextMenusIndex.toString(),
    //   onclick:  () => {
    //     console.log(`您点击了右键菜单${contextMenusIndex}！`);
    //   },
    // });
    // chrome.contextMenus.onClicked.addListener();
  };

  const handleDeleteContextMenus = () => {
    // @ts-ignore
    chrome.contextMenus.removeAll();
  };

  const handleOpenHref = (href: string) => {
    // @ts-ignore
    chrome.tabs.create({ url: href });
    // @ts-ignore
    // chrome.windows.create(
    //   {
    //     url: href,
    //   },
    //   () => {
    //     // @ts-ignore
    //     chrome.windows.getCurrent((window: any) => {
    //       console.log(window);
    //     });
    //   }
    // );
  };

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        {linkList.map((link: linkListType) => (
          <Link
            href={link.href}
            onClick={() => handleOpenHref(link.href)}
            key={link.href}
          >
            {link.children}
          </Link>
        ))}
      </div>
      <div>
        <h2>限制金额:{limit}</h2>
      </div>
      <div>
        <p>发送一个桌面通知</p>
        <Button onClick={sendNotifyOptions}>sendNotifyOptions</Button>
      </div>
      <div>
        <Button onClick={handleContextMenus}>测试右键菜单</Button>
        <Button onClick={handleDeleteContextMenus}>删除右键菜单</Button>
        {/* <Button
          onClick={() => {
            // @ts-ignore
            console.log(chrome);
            // chrome.tabs.executeScript({
            //   file: "content_script.js",
            // });
          }}
        >
          注入
        </Button> */}
      </div>
    </div>
  );
};

export default Tool;
