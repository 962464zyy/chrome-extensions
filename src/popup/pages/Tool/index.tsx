import Link from "antd/lib/typography/Link";
import { FC, useEffect, useState } from "react";
import styles from "./index.module.less";

type Props = {};

const Tool: FC<any> = (props: Props) => {
  const [limit, setLimit] = useState<number>(0);
  useEffect(() => {
    // @ts-ignore
    chrome.storage.sync.get("limit", (o: any) => {
      console.log(o);
      setLimit(o.limit);
    });
  }, []);
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
    </div>
  );
};

export default Tool;
