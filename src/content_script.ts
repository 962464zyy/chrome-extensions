console.log("这里是content_script.ts");

//创建页面函数
const createPage = (textContent: string) => {
  console.log("content_script");
  const container = document.createElement("div");
  container.style.height = "100px";
  container.style.width = "100px";
  container.textContent = textContent;
  container.style.backgroundColor = "red";
  document.body.append(container);
};
// createPage();

document.addEventListener("DOMContentLoaded", function () {
  console.log("这是content script!");

  if (location.href == "http://test.a.newrank.cn/center/#/user") {
    console.log(`张勇勇的插件插的`);
    createPage("textContent");
  }
});

// 接收来自popup或者background的消息
// @ts-ignore
chrome.runtime.onMessage.addListener(function (
  request: any,
  sender: any,
  sendResponse: any
) {
  console.log(
    "收到来自 " +
      (sender.tab
        ? "content-script(" + sender.tab.url + ")"
        : "popup或者background") +
      " 的消息：",
    request
  );
  createPage(request.text);
  sendResponse("我是content我收到你的消息了：" + JSON.stringify(request));
});
