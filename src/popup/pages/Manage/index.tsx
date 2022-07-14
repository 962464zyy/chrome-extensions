import { Button, Input } from "antd";

import { useState } from "react";

type Props = {};

const Manage = (props: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const openOptions = () => {
    console.log("openOptions");
    // @ts-ignore
    chrome.tabs.create({ url: "options.html" });
  };

  const sendMessage = () => {
    console.log(inputValue);
    // @ts-ignore
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      // @ts-ignore
      chrome.tabs.sendMessage(
        tabs[0]?.id!,
        { text: inputValue },
        (response: any) => {
          console.log("response", response);
        }
      );
    });
  };

  return (
    <div>
      <Button onClick={openOptions}>打开options</Button>
      <p>向content发送消息</p>
      <Input
        placeholder="请输入内容"
        onChange={(e: any) => setInputValue(e.target.value)}
      />
      <Button onClick={sendMessage}>发送</Button>
    </div>
  );
};

export default Manage;
