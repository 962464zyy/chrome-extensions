import md5 from "blueimp-md5";
import { sampleSize } from "lodash-es";

const arr = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

/**
 * 添加xyz参数
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 */
// @ts-ignore
export default function setXYZ(url, data = {}) {
  let code = "";

  if (url.indexOf("http://") == 0) {
    code += url.slice(url.indexOf("/", 7)) + "?AppKey=joker";
  } else if (url.indexOf("https://") == 0) {
    code += url.slice(url.indexOf("/", 8)) + "?AppKey=joker";
  } else {
    code = url + "?AppKey=joker";
  }
  //let code = `${url}?AppKey=joker`;
  let param = {};
  for (let key of Object.keys(data).sort()) {
    // @ts-ignore
    let value = data[key] === null ? "" : data[key];
    // @ts-ignore
    param[key] = value;
    code += `&${key}=${value}`;
  }

  // 随机取数大小为9的数组转为字符串
  const nonce = sampleSize(arr, 9).join("");
  code += `&nonce=${nonce}`;
  // @ts-ignore
  param.nonce = nonce;
  // @ts-ignore
  param.xyz = md5(code);
  return param;
}
