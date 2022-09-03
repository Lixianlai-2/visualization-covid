<template>
  <div class="box" :style="{ background: `url(${backgroundImg})` }">
    <div class="box-left"></div>
    <div class="box-center" id="china"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import backgroundImg from "./assets/背景图片.jpg";
import { useStore } from "./store";
import { onMounted } from "vue";
import * as echarts from "echarts";
import "../src/assets/china";

const store = useStore();

onMounted(async () => {
  await store.getList();
  console.log(store.list.diseaseh5Shelf.areaTree[0].children);
  // 基于准备好的dom，初始化echarts实例
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);
  var data = [
    {
      name: "内蒙古",
      itemStyle: {
        areaColor: "#56b1da",
      },
      value: [110.3467, 41.4899],
    },
  ];
  // 绘制图表
  charts.setOption({
    backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "123%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",

            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: true,
            // show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        map: "china",
        aspectScale: 0.75,
        // aspectScale: 8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          // 是否显示省份
          show: true,
          color: "#FFFFFF",
          // 省份问题大小
          fontSize: 14,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          // 省份边界
          borderWidth: 1,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            // show: true,
            // show: false,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        label: {
          // 是否显示坐标
          show: true,
        },
        itemStyle: {
          // color: "#D8BC37", //标志颜色
          color: "red", //标志颜色
        },
        data: data,
        showEffectOn: "render",
        rippleEffect: {
          // 波纹设置
          brushType: "stroke",
        },
        emphasis: {
          scale: true,
        },
        zlevel: 1,
        symbol: "pin",
        symbolSize: [45, 45],
        // symbolSize: [27, 30],
        symbolOffset: [0, "-10%"],
      },
    ],
  });
});
</script>

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
    width: 100px;
    // background: red;
  }
  &-center {
    // 中间的内容撑满
    flex: 1;
  }
  &-right {
    width: 100px;
    // background: blue;
  }
}
</style>
