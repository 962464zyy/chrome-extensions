import { Button } from "antd";
import Link from "antd/lib/typography/Link";
import { FC, useEffect, useState } from "react";
import styles from "./index.module.less";

type Props = {};

const Tool: FC<any> = (props: Props) => {
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
      iconUrl: "../../image/logo.png",
      message: "该喝药了，大朗",
    };
    console.log(notifyOptions);
    // @ts-ignore
    chrome.notifications.create("drinkNotify", notifyOptions);
  };
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <Link href="https://www.baidu.com/">百度</Link>
        <Link href="https://www.baidu.com/">百度</Link>
        <Link href="https://www.baidu.com/">百度</Link>
        <Link href="https://www.baidu.com/">百度</Link>
      </div>
      <div>
        <h2>限制金额:{limit}</h2>
      </div>
      <div>
        <Button onClick={sendNotifyOptions}>sendNotifyOptions</Button>
      </div>
    </div>
  );
};

export default Tool;
