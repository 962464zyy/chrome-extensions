//@ts-nocheck

import { Button, Input } from 'antd';

import { changeConfirmLocale } from 'antd/lib/modal/locale';
import { useState } from 'react';

type Props = {};

const Manage = (props: Props) => {
	const [inputValue, setInputValue] = useState<string>('');
	const openOptions = () => {
		// console.log('openOptions');
		// @ts-ignore
		chrome.tabs.create({ url: 'options.html' });
	};

	const sendMessage = () => {
		// console.log(inputValue);
		// @ts-ignore
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
			// @ts-ignore
			chrome.tabs.sendMessage(
				tabs[0]?.id!,
				{ text: inputValue },
				(response: any) => {
					console.log('response', response);
				}
			);
		});
	};

	const getCookies = () => {
		//windowId: chrome.windows.WINDOW_ID_CURRENT
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const url = new URL(tabs[0]?.url);
			console.log(url);
			chrome.cookies.getAll(
				{
					domain: url.host,
				},
				(cookies) => {
					console.log(1, cookies);
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
			<Button onClick={getCookies}>获取cookie</Button>
		</div>
	);
};

export default Manage;
