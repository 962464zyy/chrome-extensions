export enum ETABSKEYS {
  工具 = "TOOL",
  管理 = "MANAGE",
  设置 = "SET",
}
export enum ETABVALUES {
  TOOL = "工具",
  MANAGE = "管理",
  SET = "设置",
}
export const tabsOption = [
  {
    key: ETABSKEYS.工具,
    label: ETABVALUES.TOOL,
  },
  {
    key: ETABSKEYS.管理,
    label: ETABVALUES.MANAGE,
  },
  {
    key: ETABSKEYS.设置,
    label: ETABVALUES.SET,
  },
];
