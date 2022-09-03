import { defineStore } from "pinia";
import { getApiList } from "../server";
export const useStore = defineStore({
  id: "counter",
  state: () => ({
    list: {},
  }),
  actions: {
    async getList() {
      console.log("getList有运行？");
      const result = await getApiList();
      console.log(`result`, result);
    },
  },
});
