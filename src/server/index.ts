import axios from "axios";

const server = axios.create({
  // 添加到本地服务器接口，前提是打开本地服务器
  baseURL: "http://localhost:3333",
});

// 发送一个get请求并导出
export const getApiList = () => server.get("/api/list").then((res) => res.data);
