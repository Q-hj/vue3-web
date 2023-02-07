import { App } from "vue";
// import auth from "./modules/auth";
// import copy from "./modules/copy";
// import waterMarker from "./modules/waterMarker";
// import draggable from "./modules/draggable";
// import debounce from "./modules/debounce";
// import throttle from "./modules/throttle";
// import longpress from "./modules/longpress";

// 引入所有自定义指令
const directivesList = import.meta.glob("@/directives/modules/*.ts", {
  eager: true,
  import: "default",
});

// 注册所有自定义指令
export default {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // console.log(directivesList[key]);
      app.directive(key, directivesList[key]);
    });
  },
};
