import { FC, useEffect, useState } from "react";

import { Button } from "antd";
import Link from "antd/lib/typography/Link";
import styles from "./index.module.less";

type Props = {};
export interface linkListType {
  href: string;
  children: string;
  callback: () => void;
}

const Tool = (props: Props) => {
  const [limit, setLimit] = useState<number>(0);
  useEffect(() => {
    // @ts-ignore
    chrome.storage.sync.get(["limit"], (o: any) => {
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
      callback: () => {
        console.log(chrome);
        console.log(chrome.windows);
        chrome.permissions.getAll().then((res: any) => {
          console.log(res);
        });
      },
    },
    {
      href: "https://www.douyu.com/",
      children: "斗鱼",
      callback: () => {},
    },
    {
      href: "https://www.huya.com/",
      children: "虎牙",
      callback: () => {},
    },
    {
      href: "https://lpl.qq.com/",
      children: "lpl",
      callback: () => {},
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        {linkList.map((link: linkListType) => (
          <Link href={link.href} onClick={link.callback} key={link.href}>
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
    </div>
  );
};

export default Tool;
