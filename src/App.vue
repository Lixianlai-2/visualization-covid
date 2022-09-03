<template>
  <div class="box" :style="{ background: `url(${backgroundImg})` }">
    <div class="box-left"></div>
    <div class="box-center"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import backgroundImg from "./assets/背景图片.jpg";
import { useStore } from "./store";
// 怎么使用pinia调用
const store = useStore();
store.getList();
</script>

<!-- <script lang="ts">
import backgroundImg from "./assets/背景图片.jpg";
export default {
  setup() {
    return {
      backgroundImg,
    };
  },
};
</script> -->

<style lang="less">
* {
  padding: 0;
  margin: 0;
  // box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

.box {
  height: 100%;
  // border: 3px solid blue;
  display: flex;
  &-left {
    width: 400px;
    // background: red;
  }
  &-center {
    // 中间的内容撑满
    flex: 1;
  }
  &-right {
    width: 400px;
    // background: blue;
  }
}
</style>
