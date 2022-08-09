//@ts-nocheck

/** 获取Cookies */

/** 发送一个桌面通知 */
export const sendNotifyOptions = () => {
	const notifyOptions = {
		// type: basic image simple list
		type: 'basic',
		title: '该喝药了',
		// iconUrl:
		//   "https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png",
		/** 打包后的路径 */
		iconUrl: '../icons/logo.png',
		message: '该喝药了，大朗',
	};
	console.log(notifyOptions);
	// @ts-ignore
	chrome.notifications.create('drinkNotify', notifyOptions);
};
