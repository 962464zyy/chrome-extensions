import '../global.less';

import {
	BrowserRouter,
	NavLink,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import { Button, Input } from 'antd';
import { FC, useState } from 'react';

import Home1 from './components/Home1';
import Home2 from './components/Home2';
import NotFound from './components/NotFound';
import { changeConfirmLocale } from 'antd/lib/modal/locale';

import React = require('react');
import ReactDOM = require('react-dom');

type Props = {};

const Options: FC<any> = (props: Props) => {
	const [limit, setLimit] = useState<string>('');

	React.useEffect(() => {
		// @ts-ignore
		chrome.storage.local.get(['limit'], (o: any) => {
			// console.log(o);
			setLimit(o.limit);
		});
	}, []);
	const saveLimit = () => {
		// console.log('saveLimit', limit);
		//@ts-ignore
		chrome.storage.local.set({ limit: limit }, () => {
			// 设置成功之后页面关闭
			// @ts-ignore
			// setTimeout(() => {
			//   close();
			// }, 3000);
			// @ts-ignore
		});
	};
	const reset = () => {
		// console.log('reset');
		//@ts-ignore
		chrome.storage.local.set({ limit: '' });
	};
	return (
		<div>
			<h1>Options</h1>
			<hr />
			<NavLink to="home1">home1</NavLink>
			<NavLink to="home2">home2</NavLink>
			<hr />
			<div>
				<h2>预算管理选项</h2>
				<h3>
					预算限制：
					<Input
						value={limit}
						onChange={(e: any) => setLimit(e.target.value)}
					/>
					<Button onClick={saveLimit}>保存限制</Button>
					<Button onClick={reset}>清除总金额</Button>
				</h3>
			</div>
			<hr />
			<Outlet />
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/options.html" element={<Options />}>
					<Route index element={<Home1 />} />
					<Route path="home1" element={<Home1 />} />
					<Route path="home2" element={<Home2 />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
