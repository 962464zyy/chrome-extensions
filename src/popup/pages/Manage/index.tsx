import { Button, Input } from "antd";
import { FC } from "react";

type Props = {};

const Manage: FC<any> = (props: Props) => {
  const openOptions = () => {
    console.log("openOptions");
  };
  const send = () => {
    console.log("send");
  };
  return (
    <div>
      <Button onClick={openOptions}>打开options</Button>
      <p>向content发送消息</p>
      <Input placeholder="请输入内容" />
      <Button onClick={send}>发送</Button>
    </div>
  );
};

export default Manage;
