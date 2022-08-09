import { Button } from 'antd';
import { FC } from 'react';
import { PRESETBUTTONCOLORS } from '../../sourceData';

type Props = {};

const Home1 = (props: Props) => {
	const handleSetColor = (color: string) => {
		//@ts-ignore
		chrome.storage.sync.set({ color });
	};

	return (
		<div>
			<h2>Home1</h2>
			{PRESETBUTTONCOLORS.map((color: string) => (
				<Button onClick={() => handleSetColor(color)} style={{ color }}>
					{color}
				</Button>
			))}
		</div>
	);
};

export default Home1;
