# I18N 国际化工作完成

## 已更新的翻译文件

### apps/editor/messages/en.json
- 添加了 `common.new`, `common.untitled`, `common.rename` 键
- 添加了完整的 `editor.feedback` 节（反馈对话框）
- 添加了完整的 `editor.command` 节（命令面板）
- 添加了完整的 `editor.site` 节（场地面板）
- 添加了完整的 `editor.zone` 节（区域面板）
- 在 `properties` 中添加了：uniformScale, collections, collectionNamePlaceholder, noCollections, manageCollections, presets, saveNew, presetNamePlaceholder, community, myPresets, noCommunityPresets, noPresetsSaved, signInToSave, deleteConfirm, updateWithCurrent, removeFromCommunity, shareWithCommunity, scaleAndOpacity, opacity, slopeWidths, widths, total, contentPadding, horizontal, vertical, swing, hingesSide, direction, inward, outward, threshold, enableThreshold, handle, enableHandle, handleSide, hardware, doorCloser, panicBar, segment, segmentN, panel, glass, empty, columnsN, barHeight, inset, addSegment, temperature

### apps/editor/messages/zh.json
- 添加了上述所有键的中文翻译

## 已更新的组件文件

### packages/editor/src/components/feedback-dialog.tsx
- 使用 `useTranslations()` 替换所有硬编码字符串

### packages/editor/src/components/ui/command-palette/index.tsx
- 使用 `useTranslations()` 替换所有硬编码字符串（Scene, Levels, Viewer Controls, View, History, Export & Share 等）

### packages/editor/src/components/ui/panels/door-panel.tsx
- 使用翻译键替换面板标题和按钮标签

### packages/editor/src/components/ui/panels/item-panel.tsx
- 使用翻译键替换面板标题和按钮标签

### packages/editor/src/components/ui/panels/window-panel.tsx
- 使用翻译键替换面板标题和按钮标签

### packages/editor/src/components/ui/panels/presets/presets-popover.tsx
- 使用 `useTranslations()` 替换所有硬编码字符串

### packages/editor/src/components/ui/panels/collections/collections-popover.tsx
- 使用 `useTranslations()` 替换所有硬编码字符串

### packages/editor/src/components/ui/slider-demo.tsx
- 使用翻译键替换 Temperature 标签

### packages/editor/src/components/viewer-overlay.tsx
- 部分翻译（待完成）
