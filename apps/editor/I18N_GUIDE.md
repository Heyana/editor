# 国际化 (i18n) 实施指南

## 概述

本项目使用 `next-intl` 实现国际化，支持中文（默认）和英文。

## 文件结构

```
apps/editor/
├── messages/
│   ├── en.json          # 英文翻译
│   └── zh.json          # 中文翻译
├── i18n/
│   └── request.ts       # i18n 配置
├── app/
│   ├── layout.tsx       # 已集成 NextIntlClientProvider
│   └── components/
│       └── language-switcher.tsx  # 语言切换组件
└── types/
    └── i18n.d.ts        # TypeScript 类型定义

packages/editor/src/
└── lib/
    └── i18n-helpers.ts  # 翻译辅助函数
```

## 使用方法

### 1. 客户端组件

```tsx
'use client'
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations()
  
  return (
    <div>
      <h1>{t('editor.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  )
}
```

### 2. 服务端组件

```tsx
import { getTranslations } from 'next-intl/server'

export default async function MyPage() {
  const t = await getTranslations()
  
  return <h1>{t('editor.title')}</h1>
}
```

### 3. 使用命名空间

```tsx
const t = useTranslations('editor.tools')

// 直接访问嵌套键
<button>{t('wall')}</button>  // 输出: "墙体" 或 "Wall"
```

### 4. 使用辅助函数

```tsx
import { getToolTranslationKey } from '@pascal-app/editor/lib/i18n-helpers'
import { useTranslations } from 'next-intl'

const t = useTranslations()
const tool = 'wall'

<button>{t(getToolTranslationKey(tool))}</button>
```

## 翻译键结构

### common (通用)
- `save`, `cancel`, `delete`, `edit`, `close`, `confirm`
- `add`, `remove`, `reset`, `apply`
- `loading`, `error`, `success`, `warning`

### editor (编辑器)
- `title` - 应用标题
- `tools.*` - 工具名称 (wall, door, window, item, etc.)
- `phases.*` - 阶段 (site, structure, furnish)
- `modes.*` - 模式 (select, edit, delete, build)
- `layers.*` - 图层 (zones, elements)
- `categories.*` - 目录分类 (furniture, bathroom, kitchen, etc.)
- `panels.*` - 面板 (properties, layers, catalog, settings)
- `actions.*` - 操作 (undo, redo, copy, paste, duplicate, export, import, move)

### viewer (查看器)
- `camera.*` - 相机模式 (perspective, orthographic)
- `level.*` - 层级模式 (stacked, exploded, solo, manual)
- `wall.*` - 墙体模式 (up, cutaway, down)
- `display.*` - 显示选项 (showScans, showGuides, showGrid)
- `theme.*` - 主题 (light, dark, toggle)

### properties (属性)
- 通用属性: `position`, `rotation`, `scale`, `size`
- 尺寸: `width`, `height`, `depth`, `thickness`
- 外观: `color`, `material`, `visible`, `locked`

## 添加新翻译

1. 在 `apps/editor/messages/zh.json` 添加中文
2. 在 `apps/editor/messages/en.json` 添加英文
3. TypeScript 会自动提供类型提示

示例：
```json
// zh.json
{
  "editor": {
    "newFeature": {
      "title": "新功能",
      "description": "这是一个新功能"
    }
  }
}

// en.json
{
  "editor": {
    "newFeature": {
      "title": "New Feature",
      "description": "This is a new feature"
    }
  }
}
```

使用：
```tsx
const t = useTranslations('editor.newFeature')
<h1>{t('title')}</h1>
<p>{t('description')}</p>
```

## 语言切换

在任何组件中导入并使用 `LanguageSwitcher`：

```tsx
import { LanguageSwitcher } from '@/app/components/language-switcher'

export function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  )
}
```

## 已完成的国际化组件

- ✅ `icon-rail.tsx` - 侧边栏图标
- ✅ `floating-action-menu.tsx` - 浮动操作菜单
- ✅ `control-modes.tsx` - 控制模式按钮
- ✅ `structure-tools.tsx` - 结构工具栏
- ✅ `furnish-tools.tsx` - 家具工具栏
- ✅ `camera-actions.tsx` - 相机操作
- ✅ `view-toggles.tsx` - 视图切换
- ✅ Layout - 根布局
- ✅ 主页面 - 语言切换器

## 待国际化的组件

以下组件需要逐步替换硬编码文本：

### 高优先级
- [ ] 工具栏按钮 (`components/ui/action-menu/`)
- [ ] 侧边栏面板 (`components/ui/sidebar/panels/`)
- [ ] 命令面板 (`components/ui/command-palette/`)
- [ ] 属性面板 (`components/ui/panels/`)
- [ ] 目录面板 (`components/ui/item-catalog/`)

### 中优先级
- [ ] 工具提示和帮助文本
- [ ] 错误消息
- [ ] 表单标签和占位符

### 低优先级
- [ ] 开发者工具
- [ ] 调试信息

## 最佳实践

1. **使用语义化的键名**
   ```tsx
   // ✅ 好
   t('editor.tools.wall')
   
   // ❌ 不好
   t('wall')
   ```

2. **避免在翻译中使用 HTML**
   ```tsx
   // ✅ 好
   <p>{t('description')}</p>
   
   // ❌ 不好
   t('descriptionWithHtml') // 包含 <p> 标签
   ```

3. **使用命名空间减少重复**
   ```tsx
   // ✅ 好
   const t = useTranslations('editor.tools')
   t('wall')
   t('door')
   
   // ❌ 不好
   const t = useTranslations()
   t('editor.tools.wall')
   t('editor.tools.door')
   ```

4. **为动态内容使用辅助函数**
   ```tsx
   // ✅ 好
   import { getToolTranslationKey } from '@pascal-app/editor/lib/i18n-helpers'
   t(getToolTranslationKey(dynamicTool))
   
   // ❌ 不好
   t(`editor.tools.${dynamicTool}`) // 类型不安全
   ```

## 测试

切换语言后，检查：
1. 所有文本是否正确翻译
2. 布局是否适应不同长度的文本
3. Tooltip 和 title 属性是否翻译
4. 错误消息是否翻译

## 性能考虑

- `next-intl` 在服务端预加载翻译文件
- 客户端组件通过 Context 共享翻译
- 无需担心重复加载翻译文件
