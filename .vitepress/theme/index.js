import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import AiChat from "../components/AiChat.vue";
import "./styles/vars.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    // 使用默认布局
    return h(DefaultTheme.Layout);
  },
  enhanceApp({ app }) {
    app.component("AiChat", AiChat);
  },
};
