import axios from "axios";
import { axios_xyz } from "./request";
import { config } from "../config";

//获取用户信息
export const reqGetUser = () => {
  // @ts-ignore
  return axios_xyz.get(`${config.ade}xdnphb/common/account/get`);
};

//退出登录
export const reqLoginOut = () => {
  // @ts-ignore
  return axios_xyz.post(`${config.ade}nr/user/login/loginOut`);
};

/** 获取用户信息 */
export const getUserInfo = () => {
  return axios.get(
    "http://test-gw.newrank.cn:18080/api/nr-trade-security/xdnphb/adinsight/security/user/getUserInfo",
    {
      headers: {
        "n-token": "342bdbf6864146f59730fbd6eace18f9",
      },
    }
  );
};
