/*
 * @Author: NanNan
 * @Date: 2025-10-19 16:34:28
 * @LastEditTime: 2025-11-12 14:58:02
 * @Description:
 */
import { defineConfig } from 'vitepress';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取 sidebar 配置
const sidebarConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'sidebar.config.json'), 'utf-8')
);

// 根据 JSON 配置生成最终 sidebar
function buildSidebar(items: any[], basePath = ''): any[] {
  return items.map((item) => {
    const dirPath = path.posix.join(basePath, item.dir || '');
    const newItem: any = { text: item.text };

    if (item.collapsed !== undefined) newItem.collapsed = item.collapsed;

    if (item.items) {
      newItem.items = buildSidebar(item.items, dirPath);
    } else {
      // 单文件
      const linkPath = path.posix.join('/', dirPath, item.file || '');
      newItem.link = linkPath;
    }

    return newItem;
  });
}

// 最终 sidebar 对象
const sidebar: Record<string, any> = {};
for (const key in sidebarConfig) {
  sidebar[key] = buildSidebar(sidebarConfig[key]);
}

export default defineConfig({
  title: '前端开发手记',
  titleTemplate: ':title - NatNan Docs', // 页面有title时的模板
  description: 'Docs from NatNan',
  base: '/docs/',
  lastUpdated: true,
  themeConfig: {
    // 模糊搜索开启
    search: {
      provider: 'local',
    },
    // 头部导航配置
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/demo' },
    ],
    // footer
    footer: {
      message: 'NatNan Front-End Docs.',
      copyright: 'Copyright © 2015-present Nat Nan',
    },
    // 侧边栏配置
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/natnan-x' }],
  },
});
