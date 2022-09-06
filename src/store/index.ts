import { defineStore } from "pinia";
import { getApiList } from "../server";
import type {
  RootObject,
  Children,
  ChinaTotal,
  ChinaAdd,
  LocalCityNCOVDataList,
} from "./type";

export const useStore = defineStore({
  id: "counter",
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <LocalCityNCOVDataList[]>[],
  }),
  actions: {
    async getList() {
      const result = await getApiList();
      this.list = result;
      this.chinaAdd = result.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = result.diseaseh5Shelf.chinaTotal;
      this.cityDetail = result.localCityNCOVDataList.slice(0, 10);
      console.log(result);
    },
  },
});
