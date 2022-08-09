import { getUserInfo, reqGetUser } from '../../../../api';
import { useIsLogin, useLoginInfo } from '../../../../context/login';

import { Button } from 'antd';
import { FC } from 'react';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';

type Props = {};

const NotLogin = (props: Props) => {
	const [isLogin, setIsLogin] = useIsLogin();
	const [loginInfo, setLoginInfo] = useLoginInfo();

	const navigate = useNavigate();

	const login = async () => {
		const userInfo = await getUserInfo();
		// console.log("userInfo", userInfo);
		const { data } = userInfo;
		if (data.code === '000000' && data.data) {
			setIsLogin(true);
			setLoginInfo(data.data);
		}
	};
	return (
		<div className={styles.container}>
			<div>
				<p>要使用小插件，请先登录哟</p>
				<Button onClick={login}>登录</Button>
			</div>
		</div>
	);
};

export default NotLogin;
