import { Keyboard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from './../../../../../components/ui/primitives/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './../../../../../components/ui/primitives/dialog'

type ShortcutKey = string

type ShortcutConfig = {
  keys: ShortcutKey[]
  actionKey: string
  noteKey?: string
}

type ShortcutCategoryConfig = {
  titleKey: string
  shortcuts: ShortcutConfig[]
}

const KEY_DISPLAY_MAP: Record<string, string> = {
  'Arrow Up': '↑',
  'Arrow Down': '↓',
  Esc: '⎋',
  Shift: '⇧',
  Space: '␣',
}

const SHORTCUT_CATEGORIES: ShortcutCategoryConfig[] = [
  {
    titleKey: 'properties.editorNavigation',
    shortcuts: [
      { keys: ['1'], actionKey: 'properties.switchToSitePhase' },
      { keys: ['2'], actionKey: 'properties.switchToStructurePhase' },
      { keys: ['3'], actionKey: 'properties.switchToFurnishPhase' },
      { keys: ['S'], actionKey: 'properties.switchToStructureLayer' },
      { keys: ['F'], actionKey: 'properties.switchToFurnishLayer' },
      { keys: ['Z'], actionKey: 'properties.switchToZonesLayer' },
      {
        keys: ['Cmd/Ctrl', 'Arrow Up'],
        actionKey: 'properties.selectNextLevel',
      },
      {
        keys: ['Cmd/Ctrl', 'Arrow Down'],
        actionKey: 'properties.selectPrevLevel',
      },
      { keys: ['Cmd/Ctrl', 'B'], actionKey: 'properties.toggleSidebar' },
    ],
  },
  {
    titleKey: 'properties.modesHistory',
    shortcuts: [
      { keys: ['V'], actionKey: 'properties.switchToSelectMode' },
      { keys: ['B'], actionKey: 'properties.switchToBuildMode' },
      {
        keys: ['Esc'],
        actionKey: 'properties.cancelToolClearSelection',
      },
      { keys: ['Delete / Backspace'], actionKey: 'properties.deleteSelected' },
      { keys: ['Cmd/Ctrl', 'Z'], actionKey: 'properties.undo' },
      { keys: ['Cmd/Ctrl', 'Shift', 'Z'], actionKey: 'properties.redo' },
    ],
  },
  {
    titleKey: 'properties.selection',
    shortcuts: [
      {
        keys: ['Cmd/Ctrl', 'Click'],
        actionKey: 'properties.addRemoveMultiSelect',
        noteKey: 'properties.multiSelectNote',
      },
    ],
  },
  {
    titleKey: 'properties.drawingTools',
    shortcuts: [
      {
        keys: ['Shift'],
        actionKey: 'properties.disableAngleSnapping',
        noteKey: 'properties.disableAngleSnappingNote',
      },
    ],
  },
  {
    titleKey: 'properties.itemPlacement',
    shortcuts: [
      { keys: ['R'], actionKey: 'properties.rotateCW90' },
      { keys: ['T'], actionKey: 'properties.rotateCCW90' },
      {
        keys: ['Shift'],
        actionKey: 'properties.bypassValidation',
        noteKey: 'properties.bypassValidationNote',
      },
    ],
  },
  {
    titleKey: 'properties.camera',
    shortcuts: [
      {
        keys: ['Space', 'Drag'],
        actionKey: 'properties.panCamera',
        noteKey: 'properties.panCameraNote',
      },
    ],
  },
]

function getDisplayKey(key: string, isMac: boolean): string {
  if (key === 'Cmd/Ctrl') return isMac ? '⌘' : 'Ctrl'
  if (key === 'Delete / Backspace') return isMac ? '⌫' : 'Backspace'
  return KEY_DISPLAY_MAP[key] ?? key
}

function ShortcutKeys({ keys }: { keys: string[] }) {
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-1">
      {keys.map((key, index) => (
        <div className="flex items-center gap-1" key={`${key}-${index}`}>
          {index > 0 ? <span className="text-[10px] text-muted-foreground">+</span> : null}
          <kbd
            className="inline-flex h-6 items-center rounded border border-border bg-muted px-2 font-medium font-mono text-[11px] text-muted-foreground"
            title={key}
          >
            {getDisplayKey(key, isMac)}
          </kbd>
        </div>
      ))}
    </div>
  )
}

export function KeyboardShortcutsDialog() {
  const t = useTranslations()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start gap-2" variant="outline">
          <Keyboard className="size-4" />
          {t('properties.keyboardShortcuts')}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle>{t('properties.keyboardShortcuts')}</DialogTitle>
          <DialogDescription>
            {t('properties.shortcutsContextAware')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-4">
          {SHORTCUT_CATEGORIES.map((category) => (
            <section className="space-y-2" key={category.titleKey}>
              <h3 className="font-medium text-sm">{t(category.titleKey)}</h3>
              <div className="overflow-hidden rounded-md border border-border/80">
                {category.shortcuts.map((shortcut, index) => (
                  <div
                    className="grid grid-cols-[minmax(130px,220px)_1fr] gap-3 px-3 py-2"
                    key={`${category.titleKey}-${shortcut.actionKey}`}
                  >
                    <ShortcutKeys keys={shortcut.keys} />
                    <div>
                      <p className="text-sm">{t(shortcut.actionKey)}</p>
                      {shortcut.noteKey ? (
                        <p className="text-muted-foreground text-xs">{t(shortcut.noteKey)}</p>
                      ) : null}
                    </div>
                    {index < category.shortcuts.length - 1 ? (
                      <div className="col-span-2 border-border/60 border-b" />
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
