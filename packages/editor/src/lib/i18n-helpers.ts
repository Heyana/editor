import type { CatalogCategory, Mode, Phase, StructureTool, Tool } from '../store/use-editor'

/**
 * Get translation key for a tool
 */
export function getToolTranslationKey(tool: Tool): string {
  const toolMap: Record<string, string> = {
    select: 'editor.tools.select',
    wall: 'editor.tools.wall',
    door: 'editor.tools.door',
    window: 'editor.tools.window',
    item: 'editor.tools.item',
    zone: 'editor.tools.zone',
    slab: 'editor.tools.slab',
    ceiling: 'editor.tools.ceiling',
    roof: 'editor.tools.roof',
    room: 'editor.tools.room',
    'custom-room': 'editor.tools.customRoom',
    column: 'editor.tools.column',
    stair: 'editor.tools.stair',
    'property-line': 'editor.tools.propertyLine',
  }
  return toolMap[tool] || tool
}

/**
 * Get translation key for a phase
 */
export function getPhaseTranslationKey(phase: Phase): string {
  const phaseMap: Record<Phase, string> = {
    site: 'editor.phases.site',
    structure: 'editor.phases.structure',
    furnish: 'editor.phases.furnish',
  }
  return phaseMap[phase]
}

/**
 * Get translation key for a mode
 */
export function getModeTranslationKey(mode: Mode): string {
  const modeMap: Record<Mode, string> = {
    select: 'editor.modes.select',
    edit: 'editor.modes.edit',
    delete: 'editor.modes.delete',
    build: 'editor.modes.build',
  }
  return modeMap[mode]
}

/**
 * Get translation key for a catalog category
 */
export function getCategoryTranslationKey(category: CatalogCategory): string {
  const categoryMap: Record<CatalogCategory, string> = {
    furniture: 'editor.categories.furniture',
    outdoor: 'editor.categories.outdoor',
    bathroom: 'editor.categories.bathroom',
    kitchen: 'editor.categories.kitchen',
    window: 'editor.categories.window',
    door: 'editor.categories.door',
    appliance: 'editor.categories.appliance',
  }
  return categoryMap[category]
}
