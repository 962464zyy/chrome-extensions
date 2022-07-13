import {
  ISLOGIN,
  LOGININFO,
  useIsLogin,
  useLoginInfo,
} from "../../../context/login";

import { Button } from "antd";
import { FC } from "react";
import NotLogin from "../components/NotLogin";
import { useResetRecoilState } from "recoil";

type Props = {};

const Setting = (props: Props) => {
  const [isLogin, setIsLogin] = useIsLogin();
  const [loginInfo, setLoginInfo] = useLoginInfo();

  // const resetLogin = () => {
  //   const resetIsLogin = useResetRecoilState(ISLOGIN);
  //   const resetLoginInfo = useResetRecoilState(LOGININFO);
  //   resetIsLogin();
  //   resetLoginInfo();
  // };

  const logOut = () => {
    setIsLogin(false);
    setLoginInfo({});
    // resetLogin();
  };
  return (
    <div>
      {isLogin ? (
        <>
          <p>nickName:{loginInfo?.nickName}</p>
          <p>nrId:{loginInfo?.nrId}</p>
          <Button onClick={logOut}>退出登录</Button>
        </>
      ) : (
        <NotLogin />
      )}
    </div>
  );
};

export default Setting;
