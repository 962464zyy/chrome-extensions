import { Button, Input } from "antd";

type Props = {};

const Manage = (props: Props) => {
  const openOptions = () => {
    console.log("openOptions");
    // @ts-ignore
    chrome.tabs.create({ url: "options.html" });
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
