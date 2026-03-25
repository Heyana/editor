# 国际化快速参考

## 快速开始

### 在组件中使用翻译

```tsx
'use client'
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations()
  return <button>{t('common.save')}</button>
}
```

## 常用翻译键

### 按钮文本
```tsx
t('common.save')      // 保存 / Save
t('common.cancel')    // 取消 / Cancel
t('common.delete')    // 删除 / Delete
t('common.confirm')   // 确认 / Confirm
t('common.close')     // 关闭 / Close
```

### 工具名称
```tsx
t('editor.tools.wall')     // 墙体 / Wall
t('editor.tools.door')     // 门 / Door
t('editor.tools.window')   // 窗户 / Window
t('editor.tools.item')     // 物品 / Item
t('editor.tools.zone')     // 区域 / Zone
```

### 阶段
```tsx
t('editor.phases.site')       // 场地 / Site
t('editor.phases.structure')  // 结构 / Structure
t('editor.phases.furnish')    // 装饰 / Furnish
```

### 模式
```tsx
t('editor.modes.select')  // 选择模式 / Select Mode
t('editor.modes.edit')    // 编辑模式 / Edit Mode
t('editor.modes.delete')  // 删除模式 / Delete Mode
t('editor.modes.build')   // 构建模式 / Build Mode
```

### 操作
```tsx
t('editor.actions.undo')      // 撤销 / Undo
t('editor.actions.redo')      // 重做 / Redo
t('editor.actions.copy')      // 复制 / Copy
t('editor.actions.duplicate') // 复制 / Duplicate
t('editor.actions.move')      // 移动 / Move
```

## 辅助函数

```tsx
import {
  getToolTranslationKey,
  getPhaseTranslationKey,
  getModeTranslationKey,
  getCategoryTranslationKey
} from '@pascal-app/editor/lib/i18n-helpers'

// 动态工具翻译
const tool = 'wall'
t(getToolTranslationKey(tool))  // 墙体 / Wall

// 动态阶段翻译
const phase = 'structure'
t(getPhaseTranslationKey(phase))  // 结构 / Structure
```

## 命名空间用法

```tsx
// 使用命名空间减少重复
const t = useTranslations('editor.tools')

<button>{t('wall')}</button>    // 墙体 / Wall
<button>{t('door')}</button>    // 门 / Door
<button>{t('window')}</button>  // 窗户 / Window
```

## 在 Tooltip 中使用

```tsx
<Tooltip>
  <TooltipTrigger>
    <button>...</button>
  </TooltipTrigger>
  <TooltipContent>
    {t('editor.tools.wall')}
  </TooltipContent>
</Tooltip>
```

## 当前语言

```tsx
import { useLocale } from 'next-intl'

const locale = useLocale()  // 'zh' 或 'en'
```

## 切换语言

用户可以通过右上角的语言切换器切换语言，或者：

```tsx
// 通过 cookie 切换
document.cookie = 'locale=en; path=/; max-age=31536000'
window.location.reload()
```
