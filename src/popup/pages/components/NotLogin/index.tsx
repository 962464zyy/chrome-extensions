import { Button } from "antd";
import { FC } from "react";
import styles from "./index.module.less";

type Props = {};

const NotLogin: FC<any> = (props: Props) => {
  const login = () => {
    console.log("login");
  };
  return (
    <div className={styles.container}>
      <div>
        <p>要使用小插件，请先登录哟</p>
        <Button onClick={login}>登录</Button>
      </div>
    </div>
  );
};

export default NotLogin;
