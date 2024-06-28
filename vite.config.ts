import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    //vite mock 参考地址：http://events.jianshu.io/p/8ce94077af2a
    viteMockServe({
      // mockPath?: string;
      // supportTs?: boolean;
      // ignore?: RegExp | ((fileName: string) => boolean);
      // ignoreFiles?: string[];
      // configPath?: string;
      // prodEnabled?: boolean;
      // injectFile?: string;
      // injectCode?: string;
      // logger?:boolean;
      mockPath: "mock", //解析根目录下的mock文件夹
      localEnabled: true, // 开发打包开关
      prodEnabled: false, // 生产打包开关
      supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
      watchFiles: true, // 监视文件更改
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, ""),
    },
  },
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: `@import "@/assets/styles/_var.scss";`
      // },
      less: {
        javascriptEnabled: true,
        additionalData: `@import "@/assets/styles/_var.less";`,
      },
    },
  },
  // server: {
  //   open: true,
  //   port: 8080, //启动端口
  //   hmr: {
  //     host: "127.0.0.1",
  //     port: 8080,
  //   },
  //   // 设置 https 代理
  //   // proxy: {
  //   //   "/api": {
  //   //     target: "your https address",
  //   //     changeOrigin: true,
  //   //     rewrite: (path: string) => path.replace(/^\/api/, ""),
  //   //   },
  //   // },
  // },
});
