console.log("bg");
// @ts-ignore
chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已被安装");
  // @ts-ignore
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    // @ts-ignore
    chrome.tabs.sendMessage(
      tabs[0]?.id!,
      { greeting: "hello，我是后台，主动发消息给content-script" },
      (response: any) => {
        console.log(response);
      }
    );
  });
});
