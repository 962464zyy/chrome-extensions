import { atom, useRecoilState, useResetRecoilState } from "recoil";

/** 登录状态 */
export const ISLOGIN = atom<boolean>({
  key: "ISLOGIN",
  default: false,
});

/** 登录信息 */
export const LOGININFO = atom<any>({
  key: "LOGININFO",
  default: {},
});

/** 返回登录状态 */
export const useIsLogin = () => useRecoilState(ISLOGIN);

/** 返回登录信息 */
export const useLoginInfo = () => useRecoilState(LOGININFO);

/** 重置登录状态 登录信息 */
export const resetLogin = () => {
  const resetIsLogin = useResetRecoilState(ISLOGIN);
  const resetLoginInfo = useResetRecoilState(LOGININFO);
  resetIsLogin();
  resetLoginInfo();
};
