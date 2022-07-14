console.log("这里是content_script.ts");

//创建页面函数
const createPage = (textContent: string) => {
  console.log("content_script");
  const container = document.createElement("div");
  container.style.height = "100px";
  container.style.width = "100px";
  container.textContent = textContent;
  container.style.backgroundColor = "red";
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.right = "0";
  container.style.zIndex = "100";
  container.id = "doubleyongDeDiv";
  document.body.append(container);
};
// createPage();

document.addEventListener("DOMContentLoaded", function () {
  console.log("这是content script!");

  // if (location.href == "http://test.a.newrank.cn/center/#/user") {
  //   console.log(`张勇勇的插件插的`);
  //   createPage("textContent");
  // }
  // createPage("textContent");
});
if (location.href == "http://test.a.newrank.cn/center/#/user") {
  console.log(`doubleyong的插件插的`);
  const titleDomList = document.getElementsByTagName("title");
  let titles = "";
  Array.from(titleDomList).forEach((item: any) => {
    titles += item.textContent + "\n";
  });
  createPage(titles);
}
// createPage("textContent");

// 接收来自popup或者background的消息
// @ts-ignore
chrome.runtime.onMessage.addListener(function (
  request: any,
  sender: any,
  sendResponse: any
) {
  console.log("接收来自popup或者background的消息", request, sender);
  const div = document.getElementById("doubleyongDeDiv");
  if (div) {
    div.textContent = request.text;
  } else {
    createPage(request.text);
  }
  sendResponse(
    "我是content_script,我收到你的消息了：" + JSON.stringify(request)
  );
});
