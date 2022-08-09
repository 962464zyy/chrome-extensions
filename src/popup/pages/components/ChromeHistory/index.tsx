import { Button, Input } from 'antd';

import { sendNotifyOptions } from '../../../../utils';
import { useState } from 'react';

export interface IndexProps {}
/**
 * 使用chrome.historyAPI 与浏览器的访问页面记录进行交互。
 * 您可以添加、删除和查询浏览器历史记录中的 URL
 */
const ChromeHistory = (props: IndexProps) => {
	const [searchValue, setSearchValue] = useState<string>('');

	/** 添加网址 */
	const addUrl = () => {
		//@ts-ignore
		chrome.history.addUrl(
			{
				url: searchValue,
			},
			() => {
				// 此回调没有参数
			}
		);
	};
	/** 删除所有 */
	const deleteAll = () => {
		//@ts-ignore
		chrome.history.deleteAll(() => {
			// 此回调没有参数
		});
	};
	/** 删除范围内的 */
	const deleteRange = () => {
		//@ts-ignore
		chrome.history.deleteRange(
			{
				endTime: Date.now() - 1000 * 60 * 60 * 1,
				startTime: Date.now() - 1000 * 60 * 60 * 2,
			},
			() => {
				// 此回调没有参数
			}
		);
	};
	/** 搜索 */
	const search = () => {
		//@ts-ignore
		chrome.history.search({ text: searchValue }, (a) => {
			// a是一个数组，数组的每一项是一个对象，包含以下属性
			// id: '10610';
			// lastVisitTime: 1659668581435.519;
			// title: 'async/await';
			// typedCount: 0;
			// url: 'https://zh.javascript.info/async-await';
			// visitCount: 2;
			console.log(a);
		});
	};

	/** 删除网址 从历史记录中删除所有出现的给定 URL */
	const deleteUrl = () => {
		//@ts-ignore
		chrome.history.deleteUrl(
			{
				url: searchValue,
			},
			() => {
				// 此回调没有参数
			}
		);
	};

	/** 获取访问特定url的信息 */
	const getVisits = () => {
		//@ts-ignore
		chrome.history.getVisits({ url: searchValue }, (results: any) => {
			// [{
			// 	id: "77",
			// 	referringVisitId: "24",
			// 	transition: "link",
			// 	visitId: "25",
			// 	visitTime: 1659943222486.428
			// }]
			console.log('results', results);
		});
	};

	/** Events */
	/** 已访问 访问该url时触发，提供改url的HistoryItem数据，此事件在页面加载之前触发 */
	/** 可以在background中执行 并且每次刷新浏览器网站时都会执行 */
	const onVisited = () => {
		//@ts-ignore
		chrome.history.onVisited.addListener((result) => {
			// id: "78"
			// lastVisitTime: 1659944399356.2979
			// title: "chrome.history - Chrome 开发者"
			// typedCount: 0
			// url: "https://developer.chrome.com/docs/extensions/reference/history/#type-UrlDetails"
			// visitCount: 2
			console.log('result', result);
			sendNotifyOptions();
		});
	};

	/** 当从历史服务中删除一个或多个url时触发，删除所有访问后，该url将从历史记录中清除 */
	const onVisitRemoved = () => {
		//@ts-ignore
		chrome.history.onVisitRemoved.addListener((removed) => {
			// 这里会指定n次，取决于有多少条记录
			// 如果所有历史记录都已删除，则allHistory为真。如果为真，则 urls 将为空
			// allHistory: true
			// urls: [] 这里是删除的那部分url
			console.log(removed);
		});
	};

	return (
		<div>
			<h2>History</h2>
			<Input
				onChange={(e: any) => setSearchValue(e.target.value.trim())}
				placeholder="网站地址:search可输入部分，addUrl输入完整url"
			/>
			<Button onClick={search}>search</Button>
			<Button onClick={addUrl}>addUrl</Button>
			<Button onClick={deleteAll}>deleteAll</Button>
			<Button onClick={deleteRange}>deleteRange</Button>
			<Button onClick={deleteUrl}>deleteUrl</Button>
			<Button onClick={getVisits}>getVisits</Button>
			<Button onClick={onVisited}>onVisited</Button>
			<Button onClick={onVisitRemoved}>onVisitRemoved</Button>
		</div>
	);
};

export default ChromeHistory;
