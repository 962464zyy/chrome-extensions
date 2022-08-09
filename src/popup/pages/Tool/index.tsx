import { FC, useEffect, useState } from 'react';

import { Button } from 'antd';
import ChromeBookmarks from '../components/ChromeBookmarks';
import ChromeHistory from '../components/ChromeHistory';
import Link from 'antd/lib/typography/Link';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import { sendNotifyOptions } from '../../../utils';
import styles from './index.module.less';

type Props = {};
export interface linkListType {
	href: string;
	children: string;
}

const Tool = (props: Props) => {
	const [limit, setLimit] = useState<number>(0);
	const [contextMenusIndex, setContextMenusIndex] = useState<number>(1);
	const [hasBackgroundColor, setHasBackgroundColor] = useState<boolean>(false);

	document.addEventListener('DOMContentLoaded', function () {
		// console.log("我被执行了！tool");
	});

	useEffect(() => {
		// @ts-ignore
		chrome.storage.local.get(['limit'], (o: any) => {
			// console.log(o);
			setLimit(o.limit);
		});
	}, []);

	const linkList: linkListType[] = [
		{
			href: 'https://www.baidu.com/',
			children: '百度',
		},
		{
			href: 'https://www.douyu.com/',
			children: '斗鱼',
		},
		{
			href: 'https://www.huya.com/',
			children: '虎牙',
		},
		{
			href: 'https://lpl.qq.com/',
			children: 'lpl',
		},
	];

	const handleContextMenus = () => {
		setContextMenusIndex(contextMenusIndex + 1);
		// @ts-ignore
		chrome.contextMenus.create({
			title: '测试右键菜单' + contextMenusIndex,
			id: contextMenusIndex.toString(),
			onclick: () => {
				console.log(`您点击了右键菜单${contextMenusIndex}！`);
			},
		});
		// chrome.contextMenus.onClicked.addListener();
	};

	const handleDeleteContextMenus = () => {
		// @ts-ignore
		chrome.contextMenus.removeAll();
	};

	const handleOpenHref = (href: string) => {
		// @ts-ignore
		chrome.tabs.create({ url: href });
		// @ts-ignore
		// chrome.windows.create(
		//   {
		//     url: href,
		//   },
		//   () => {
		//     // @ts-ignore
		//     chrome.windows.getCurrent((window: any) => {
		//       console.log(window);
		//     });
		//   }
		// );
	};

	/** 切换页面背景色 */
	const togglePagebackgroundColor = () => {
		if (hasBackgroundColor) {
			document.body.style.backgroundColor = '#ffffff';
			setHasBackgroundColor(false);
		} else {
			//@ts-ignore
			chrome.storage.sync.get('color', ({ color }) => {
				document.body.style.backgroundColor = color;
			});
			setHasBackgroundColor(true);
		}
	};

	const ChangeBackgroundColor = async () => {
		//@ts-ignore
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});
		console.log(tab);
		//@ts-ignore
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: setPagebackgroundColor,
		});
	};
	/** 设置背景色 */
	const setPagebackgroundColor = () => {
		//@ts-ignore
		chrome.storage.sync.get('color', ({ color }) => {
			document.body.style.backgroundColor = color;
		});
	};

	/** 读取设备属性 */
	// const getDeviceAttributes = () => {
	// 	//@ts-ignore
	// 	console.log(chrome.enterprise);
	// };

	return (
		<div className={styles.container}>
			<div className={styles.link}>
				{linkList.map((link: linkListType) => (
					<Link
						href={link.href}
						onClick={() => handleOpenHref(link.href)}
						key={link.href}
					>
						{link.children}
					</Link>
				))}
			</div>
			<div>
				<h2>限制金额:{limit}</h2>
			</div>
			<div>
				<p>发送一个桌面通知</p>
				<Button onClick={sendNotifyOptions}>sendNotifyOptions</Button>
			</div>
			<div>
				<Button onClick={handleContextMenus}>测试右键菜单</Button>
				<Button onClick={handleDeleteContextMenus}>删除右键菜单</Button>
				<Button onClick={ChangeBackgroundColor}>ChangeBackgroundColor</Button>
				<Button onClick={togglePagebackgroundColor}>
					togglePagebackgroundColor
				</Button>
				<Button onClick={setPagebackgroundColor}>setPagebackgroundColor</Button>
				{/* <Button onClick={getDeviceAttributes}>
					chrome.enterprise.deviceAttributes(读取设备属性)
				</Button> */}
				{/* <Button
					onClick={() => {
						// @ts-ignore
						console.log(chrome);
						// chrome.tabs.executeScript({
						//   file: "content_script.js",
						// });
					}}
				>
					注入
				</Button> */}
				{/* history */}
				{/* <ChromeHistory /> */}
				{/* bookmarks */}
				<ChromeBookmarks />
			</div>
		</div>
	);
};

export default Tool;
