import Link from "antd/lib/typography/Link";
import { FC } from "react";
import styles from "./index.module.less";

type Props = {};

const Tool: FC<any> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Link href="https://www.baidu.com/">百度</Link>
      <Link href="https://www.baidu.com/">百度</Link>
      <Link href="https://www.baidu.com/">百度</Link>
      <Link href="https://www.baidu.com/">百度</Link>
    </div>
  );
};

export default Tool;
