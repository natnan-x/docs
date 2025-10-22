import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端开发手记",
  description: "A VitePress Site",
  base: "/docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: {
      // Base 模块的侧边栏
      "/base/": [
        {
          text: "JavaScript",
          collapsed: false,
          items: [
            { text: "原型链", link: "/base/js-prototype" },
            { text: "数据类型", link: "/base/js-type" },
            { text: "数组方法", link: "/base/js-array" },
            { text: "对象方法", link: "/base/js-object" },
            { text: "正则表达式", link: "/base/js-regex" },
            // 新增面试题分组
            {
              text: "面试题",
              collapsed: false,
              items: [
                {
                  text: "1.如何判断元素的变化",
                  link: "/base/js-interview/q1",
                },
                { text: "2.说说你对闭包的理解", link: "/base/js-interview/q2" },
                { text: "问题3", link: "/base/js-interview/question3" },
              ],
            },
          ],
        },

        {
          text: "HTML",
          collapsed: true,
          items: [
            { text: "原型链", link: "/base/" },
            { text: "数组vs对象", link: "/base/guide" },
          ],
        },
        {
          text: "CSS",
          collapsed: true,
          items: [
            { text: "原型链", link: "/base/" },
            { text: "数组vs对象", link: "/base/guide" },
          ],
        },
      ],

      // React 模块的侧边栏
      "/react/": [
        {
          text: "React 教程",
          collapsed: false,
          items: [
            { text: "简介", link: "/react/" },
            { text: "Hooks", link: "/react/hooks" },
            { text: "组件", link: "/react/component" },
          ],
        },
      ],

      // 默认（匹配不到上面路径时使用）
      "/": [
        {
          text: "首页",
          items: [{ text: "开始使用", link: "/" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
