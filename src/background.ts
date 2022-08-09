//@ts-ignore
// 目前会导致这个错误  暂时不用  Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
// chrome.runtime.onInstalled.addListener(() => {
// 	// console.log('插件已被安装');
// 	// @ts-ignore
// 	chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
// 		// @ts-ignore
// 		chrome.tabs.sendMessage(
// 			tabs[0]?.id!,
// 			{ greeting: 'hello，我是后台，主动发消息给content-script' },
// 			(response: any) => {
// 				console.log(response);
// 			}
// 		);
// 	});
// });

import { COLOR } from './common/js/commonVariable';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import { sendNotifyOptions } from './utils';

//@ts-ignore
// chrome.cookies.onChanged.addListener((changeInfo) => {
// 	console.log('changeInfo', changeInfo);
// 	const { cause, cookie, removed } = changeInfo;
// 	if (cause === 'explicit' || cause === 'overwrite') {
// 		console.log(cookie);
// 	}
// });

//@ts-ignore
// chrome.tabs.onActivated.addListener(() => {
// 	//@ts-ignore
// 	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// 		const url = new URL(tabs[0].url);
// 		console.log(url);
// 		// @ts-ignore
// 		chrome.cookies.getAll({ domain: url.host }, (cookies) => {
// 			console.log(cookies);
// 		});
// 	});
// });

/**
 * runtime.onInstalled 首先在后台脚本中包含一个监听事件
 */
//@ts-ignore
chrome.runtime.onInstalled.addListener(() => {
	//@ts-ignore
	chrome.storage.sync.set({ color: COLOR });
});

/** 已访问 访问该url时触发，提供改url的HistoryItem数据，此事件在页面加载之前触发 */
// const addListener = () => {
// 	//@ts-ignore
// 	chrome.history.onVisited.addListener((result) => {
// 		console.log('result', result);
// 		sendNotifyOptions();
// 	});
// };
// addListener();

/**
 * events
 * onChanged
 * 目前，只有标题和网址更改会触发此操作
 */
const onChanged = () => {
	//@ts-ignore
	chrome.bookmarks.onChanged.addListener((id: string, changeInfo: any) => {
		console.log('id:' + id);
		console.log(changeInfo);
		console.log(
			'当书签或文件夹更改时触发,目前，只有标题和网址更改会触发此操作'
		);
	});
};
onChanged();
