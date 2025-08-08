// stagewise工具栏设置
import { initToolbar } from '@stagewise/toolbar';

// stagewise工具栏配置
const stagewiseConfig = {
  plugins: [
    {
      name: 'text-tools-plugin',
      description: '为文字处理工具网站添加附加上下文信息',
      shortInfoForPrompt: () => {
        return "这是一个文字处理工具网站，选中的元素与文本处理功能相关。";
      },
      mcp: null,
      actions: [
        {
          name: '查看元素信息',
          description: '显示选中元素的详细信息',
          execute: () => {
            window.alert('元素信息查看功能!');
          },
        },
        {
          name: '编辑样式',
          description: '编辑选中元素的样式',
          execute: () => {
            window.alert('元素样式编辑功能!');
          },
        }
      ],
    },
  ],
};

// 初始化stagewise工具栏
export function setupStagewise() {
  // 仅在开发模式下初始化一次
  if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
    console.log('初始化Stagewise工具栏...');
    initToolbar(stagewiseConfig);
  }
}

// 导出配置，以便其他地方可以使用
export { stagewiseConfig }; 