export interface ShowAddSwitch {
  confirm: boolean;
  suspect: boolean;
  importedCase: boolean;
  noInfect: boolean;
  all: boolean;
  heal: boolean;
  nowConfirm: boolean;
  nowSevere: boolean;
  localConfirm: boolean;
  localinfeciton: boolean;
  dead: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  highRiskAreaNum: number;
  mediumRiskAreaNum: number;
  provinceLocalConfirm: number;
  continueDayZeroLocalConfirm: number;
  adcode: string;
  confirm: number;
  heal: number;
  wzz: number;
  continueDayZeroLocalConfirmAdd: number;
  showRate: boolean;
  dead: number;
  showHeal: boolean;
  mtime: string;
  nowConfirm: number;
}

export interface Today {
  wzz_add: number;
  local_confirm_add: number;
  abroad_confirm_add: number;
  dead_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
}

export interface Total {
  continueDayZeroLocalConfirmAdd: number;
  mtime: string;
  continueDayZeroConfirmAdd: number;
  confirm: number;
  dead: number;
  showHeal: boolean;
  provinceLocalConfirm: number;
  highRiskAreaNum: number;
  nowConfirm: number;
  showRate: boolean;
  heal: number;
  continueDayZeroConfirm: number;
  adcode: string;
  wzz: number;
  mediumRiskAreaNum: number;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  wzz_add: string;
  local_confirm_add: number;
}

export interface Total {
  dead: number;
  heal: number;
  provinceLocalConfirm: number;
  mediumRiskAreaNum: number;
  continueDayZeroLocalConfirm: number;
  confirm: number;
  showRate: boolean;
  showHeal: boolean;
  adcode: string;
  nowConfirm: number;
  wzz: number;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  mtime: string;
}

export interface Children {
  name: string;
  adcode: string;
  date: string;
  today: Today;
  total: Total;
}

export interface Children {
  today: Today;
  total: Total;
  children: Children[];
  name: string;
  adcode: string;
  date: string;
}

export interface AreaTree {
  today: Today;
  total: Total;
  children: Children[];
  name: string;
}

export interface ChinaTotal {
  mtime: string;
  localConfirmAdd: number;
  mediumRiskAreaNum: number;
  mRiskTime: string;
  suspect: number;
  nowSevere: number;
  deadAdd: number;
  localConfirmH5: number;
  localWzzAdd: number;
  highRiskAreaNum: number;
  confirm: number;
  importedCase: number;
  noInfectH5: number;
  nowLocalWzz: number;
  noInfect: number;
  showlocalinfeciton: number;
  local_acc_confirm: number;
  confirmAdd: number;
  nowConfirm: number;
  localConfirm: number;
  heal: number;
  dead: number;
  showLocalConfirm: number;
}

export interface ChinaAdd {
  heal: number;
  nowConfirm: number;
  localConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
  confirm: number;
  dead: number;
  suspect: number;
  nowSevere: number;
  importedCase: number;
  noInfect: number;
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
}

export interface LocalCityNCOVDataList {
  province: string;
  adcode: string;
  local_wzz_add: string;
  isSpecialCity: boolean;
  city: string;
  date: string;
  isUpdated: boolean;
  mtime: string;
  local_confirm_add: number;
  mediumRiskAreaNum: number;
  highRiskAreaNum: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  localCityNCOVDataList: LocalCityNCOVDataList[];
}
