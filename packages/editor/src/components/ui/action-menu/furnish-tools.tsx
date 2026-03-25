'use client'

import NextImage from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from './../../../lib/utils'
import { getCategoryTranslationKey } from './../../../lib/i18n-helpers'
import useEditor, { type CatalogCategory } from './../../../store/use-editor'
import { ActionButton } from './action-button'

export type FurnishToolConfig = {
  id: 'item'
  iconSrc: string
  labelKey: string
  catalogCategory: CatalogCategory
}

// Furnish mode tools: furniture, appliances, decoration
export const furnishTools: FurnishToolConfig[] = [
  {
    id: 'item',
    iconSrc: '/icons/couch.png',
    labelKey: 'editor.categories.furniture',
    catalogCategory: 'furniture',
  },
  {
    id: 'item',
    iconSrc: '/icons/appliance.png',
    labelKey: 'editor.categories.appliance',
    catalogCategory: 'appliance',
  },
  {
    id: 'item',
    iconSrc: '/icons/kitchen.png',
    labelKey: 'editor.categories.kitchen',
    catalogCategory: 'kitchen',
  },
  {
    id: 'item',
    iconSrc: '/icons/bathroom.png',
    labelKey: 'editor.categories.bathroom',
    catalogCategory: 'bathroom',
  },
  {
    id: 'item',
    iconSrc: '/icons/tree.png',
    labelKey: 'editor.categories.outdoor',
    catalogCategory: 'outdoor',
  },
]

export function FurnishTools() {
  const t = useTranslations()
  const mode = useEditor((state) => state.mode)
  const activeTool = useEditor((state) => state.tool)
  const setActiveTool = useEditor((state) => state.setTool)
  const setMode = useEditor((state) => state.setMode)
  const catalogCategory = useEditor((state) => state.catalogCategory)
  const setCatalogCategory = useEditor((state) => state.setCatalogCategory)

  const hasActiveTool = furnishTools.some(
    (tool) => mode === 'build' && activeTool === 'item' && catalogCategory === tool.catalogCategory,
  )

  return (
    <div className="flex items-center gap-1.5 px-1">
      {furnishTools.map((tool, index) => {
        // For item tools with catalog category, check both tool and category match
        const isActive =
          mode === 'build' && activeTool === 'item' && catalogCategory === tool.catalogCategory
        
        const label = t(tool.labelKey)

        return (
          <ActionButton
            className={cn(
              'rounded-lg duration-300',
              isActive
                ? 'z-10 scale-110 bg-black/40 hover:bg-black/40'
                : 'scale-95 bg-transparent opacity-60 grayscale hover:bg-black/20 hover:opacity-100 hover:grayscale-0',
            )}
            key={`${tool.id}-${tool.catalogCategory ?? index}`}
            label={label}
            onClick={() => {
              if (!isActive) {
                setCatalogCategory(tool.catalogCategory)
                setActiveTool('item')
                if (mode !== 'build') {
                  setMode('build')
                }
              }
            }}
            size="icon"
            variant="ghost"
          >
            <NextImage
              alt={label}
              className="size-full object-contain"
              height={28}
              src={tool.iconSrc}
              width={28}
            />
          </ActionButton>
        )
      })}
    </div>
  )
}
