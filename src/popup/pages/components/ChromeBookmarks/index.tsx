import { Button, Input } from 'antd';

import { useState } from 'react';

export interface ChromeBookmarksProps {}
/**
 * 使用chrome.bookmarksAPI 创建、组织和以其他方式操作书签。
 * 您可以使用它来创建自定义书签管理器页面
 */
const ChromeBookmarks = (props: ChromeBookmarksProps) => {
	/**
	 * 书签以树的形式组织，树中的每个节点要么是书签，要么是文件夹（有时称为组）。
	 * 树中的每个节点都由一个bookmarks.BookmarkTreeNode对象表示
	 */
	/**
	 * 您不能使用此 API 在根文件夹中添加或删除条目。您也不能重命名、移动或删除特殊的“书签栏”和“其他书签”文件夹
	 */

	const [searchValue, setSearchValue] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [url, setUrl] = useState<string>('');

	/**
	 * 创建一个标签为“扩展标签”的文件夹
	 * 第一个参数指定新文件夹的属性
	 * 第二个参数定义创建文件夹后要执行的函数
	 */
	const create = () => {
		//@ts-ignore
		chrome.bookmarks.create(
			{
				//@ts-ignore
				parentId: searchValue,
				title: 'Extension bookmarks',
			},
			(newFolder: any) => {
				console.log(newFolder);
			}
		);
	};

	/** getTree检索整个书签层次结构 */
	const getTree = () => {
		//@ts-ignore
		chrome.bookmarks.getTree((results: any) => {
			/**
			 * results是一个数组 是一个树的结构
			 * children: []
			 *  dateAdded: 1647227040320
			 * id: "2"
			 * index: 1
			 * parentId: "0"
			 * title: "其他书签"
			 */
			console.log('results', results);
		});
	};

	/** 移动 将指定的BookmarkTreeNode 移动到提供的位置 */
	const move = () => {
		/**
		 * move参数
		 *  id: string,
		 *  destination: {index:number,parentId: string}, index在数组中的位置 parentId 他爸爸的id
		 *  callback?: function,
		 */
		//@ts-ignore
		chrome.bookmarks.move(
			searchValue,
			{
				index: 1,
				parentId: '1',
			},
			(result: any) => {
				/** 正在处理的书签 */
				/**
				 * dateAdded: 1647228766716
				 * id: "6"
				 * index: 1
				 * parentId: "1"
				 * title: "工作要“有度” · 语雀"
				 * url: "https://newrank.yuque.com/docs/share/9227cbd3-8da9-43d1-8fab-572c83857f6e?#"
				 */
				console.log('result', result);
			}
		);
	};

	/**
	 * remove 删除书签或空书签文件夹 不可以在根目录那里使用
	 * 如果嵌套了多个文件夹，那只能从最低的那一层开始删除 或者使用 removeTree 递归删除书签文件夹
	 * */
	const remove = () => {
		/**
		 * remove参数
		 * id: string
		 * callbakc?: function
		 */
		//@ts-ignore
		chrome.bookmarks.remove(searchValue, () => {
			// 此回调没有参数
			console.log('已删除书签或者空书签文件夹');
		});
	};

	/** removeTree 递归删除书签文件夹 不可以在根目录那里使用 */
	const removeTree = () => {
		/**
		 * removeTree参数
		 * id: string
		 * callback?: function
		 */
		//@ts-ignore
		chrome.bookmarks.removeTree(searchValue, () => {
			//此回调没有参数
		});
	};

	/**
	 * search 搜索与给定查询匹配的 BookmarkTreeNodes
	 * 使用对象指定的查询会生成与所有指定属性匹配的BookmarkTreeNodes
	 */
	const search = () => {
		/**
		 * search参数
		 * query: string | object 与书签 URL 和标题匹配的单词和引用短语的字符串 | {query,url} 如果是对象，则可以指定属性query、url和 ，并且title将生成匹配所有指定属性的书签​​
		 * callback?: function
		 */
		//@ts-ignore
		chrome.bookmarks.search(searchValue, (results: any) => {
			/**
			 * results 是一个匹配后的数组 匹配规则还没有完全看懂
			 * 可以通过一个完整的url或者title进行精准匹配
			 */
			/**
			 * dateAdded: 1647228751316
			 * id: "5"
			 * index: 0
			 * parentId: "1"
			 * title: "语雀使用说明 · 语雀"
			 * url: "https://newrank.yuque.com/docs/share/b10b5384-ff47-4c21-b7e7-0183fed31be6?#"
			 */
			console.log('results', results);
		});
	};

	/** update */
	const update = () => {
		/**
		 * update参数
		 * id: string
		 * changes: {title?:string,url?: string} 要改变的属性，目前只支持title和url
		 * callabck?: function
		 */
		//@ts-ignore
		chrome.bookmarks.update(searchValue, { title, url }, (result: any) => {
			console.log('result', result);
		});
	};

	/** events */
	/**
	 * onChanged
	 * 目前，只有标题和网址更改会触发此操作
	 * 放在background中执行，触发时执行一次，如果放在这里执行，会执行多次
	 */
	const onChanged = () => {
		//@ts-ignore
		chrome.bookmarks.onChanged.addListener((id: string, changeInfo: any) => {
			console.log('id:' + id);
			console.log('changeInfo:' + changeInfo);
			console.log(
				'当书签或文件夹更改时触发,目前，只有标题和网址更改会触发此操作'
			);
		});
	};

	/**
	 * onChildrenRecordered
	 * 当文件夹的子级由于UI中的排序顺序而更改其顺序时触发，这不是作为move()的结果调用的
	 */
	const onChildrenReordered = () => {
		//@ts-ignore
		chrome.bookmarks.onChildrenReordered.addListener(
			(id: string, reorderInfo: any) => {
				console.log('id:' + id);
				console.log(reorderInfo);
				console.log('你更改了书签的顺序');
			}
		);
	};

	/**
	 * onCreated
	 * 创建书签或文件夹时触发
	 */
	const onCreated = () => {
		//@ts-ignore
		chrome.bookmarks.onCreated.addListener((id: string, bookmark: any) => {
			console.log(id);
			console.log(bookmark);
		});
	};

	/**
	 * onImportBegan
	 * 当书签导入会话开始时触发，昂贵的观察者应该忽略 onCreated 更新，直到 onImportEnded 被触发。
	 * 观察者仍应立即处理其他通知
	 */
	const onImportBegan = () => {
		//@ts-ignore
		chrome.bookmarks.onImportBegan.addListener(() => {
			//此回调没有参数
		});
	};

	return (
		<div>
			<h2>ChromeBookmarks</h2>
			<Input
				placeholder="searchValue"
				onChange={(e: any) => setSearchValue(e.target.value)}
			/>
			<Input
				placeholder="title 仅在update时使用"
				onChange={(e: any) => setTitle(e.target.value)}
			/>
			<Input
				placeholder="url 仅在update时使用"
				onChange={(e: any) => setUrl(e.target.value)}
			/>
			<Button onClick={create}>create</Button>
			<Button onClick={getTree}>getTree</Button>
			<Button onClick={move}>move</Button>
			<Button onClick={remove}>remove</Button>
			<Button onClick={removeTree}>removeTree</Button>
			<Button onClick={search}>search</Button>
			<Button onClick={update}>update</Button>
		</div>
	);
};

export default ChromeBookmarks;
