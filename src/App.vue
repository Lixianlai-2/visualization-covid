<template>
  <div
    class="box"
    :style="{ background: `url(${backgroundImg}) center center` }"
  >
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日 + {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本地现有确诊</div>
        </section>
        <section>
          <div>较上日 + {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日 + {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日 + {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日 + {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日 + {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
    </div>
    <div class="box-center" id="china"></div>
    <div class="box-right" style="color: aliceblue">
      <table class="table styled-table" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.item" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.today.confirm }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import backgroundImg from "./assets/背景图片.jpg";
import { useStore } from "./store";
import { onMounted } from "vue";
import * as echarts from "echarts";
// 引入中国地图的echarts数据
import "../src/assets/china";
// 引入省份的经纬度数据
import { geoCoordMap } from "../src/assets/geoMap";
// 得到store中的内容
const store = useStore();

onMounted(async () => {
  // 发送异步请求
  await store.getList();

  initEcharts();
});

// 把业务逻辑封装在initEcharts里面
const initEcharts = function () {
  const provinces = store.list.diseaseh5Shelf.areaTree[0].children;
  console.log(store.list);
  // 默认展示的四川数据
  store.item = provinces[3].children;

  // 基于准备好的dom，初始化echarts实例
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);

  var data = provinces.map((p) => {
    return {
      name: p.name,
      // 通过省份名，得到经纬度，然后加入当前确诊信息
      value: geoCoordMap[p.name].concat(p.total.nowConfirm),
      children: p.children,
    };
  });

  // 绘制图表
  charts.setOption({
    // 删除图片的背景颜色
    // backgroundColor: "black",
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
        // shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        // shadowOffsetY: 15,
        opacity: 0,
      },
      emphasis: {
        // areaColor: "red",
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
          // 省份字体颜色
          color: "white",
          // color: "#FFFFFF",
          // 省份字体大小
          fontSize: 14,
        },
        itemStyle: {
          // areaColor: "red",
          // 地图颜色
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          // 省份边界
          borderWidth: 1,
        },
        emphasis: {
          // areaColor: "red",
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
          formatter(value: any) {
            // 展示目前确诊信息
            return value.data.value[2];
          },
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
        // symbolSize: [100, 100],
        symbolSize: [30, 30],
        symbolOffset: [0, "-10%"],
      },
    ],
  });

  charts.on("click", (e: any) => {
    store.item = e.data.children;
    console.log(store.item);
  });
};
</script>

<style lang="less">
@itemBorder: #22334d;
@itemBg: #1e3655;
@itemColor: #4f8bc0;

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
    // width: 90%;
    width: 400px;
    &-card {
      margin-top: 25px;
      margin-left: 10px;
      width: 95%;
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: auto auto auto;
      section {
        background: @itemBg;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border: 1px solid #352834;
        div {
          color: #96a7b7;
          font-size: 14px;
        }
        div:nth-child(2) {
          font-size: 20px;
          font-weight: bold;
          padding: 5px;
          color: @itemColor;
        }
      }
    }
  }
  &-center {
    // 中间的内容撑满
    flex: 1;
  }
  &-right {
    width: 400px;
    overflow: auto;
    margin-left: 5px;
    // background: blue;
  }
}

.table {
  font-size: 12px;
  width: 97%;
  background: #38536e;
  border-collapse: collapse;
  // border: none;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }
    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
      text-align: center;
    }
  }
}
</style>
