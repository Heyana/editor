'use client'

import { useTranslations } from 'next-intl'

export function ExampleUsage() {
  const t = useTranslations()

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{t('editor.title')}</h1>
      
      <div>
        <h2 className="text-xl font-semibold">工具 / Tools</h2>
        <ul className="list-disc list-inside">
          <li>{t('editor.tools.select')}</li>
          <li>{t('editor.tools.wall')}</li>
          <li>{t('editor.tools.door')}</li>
          <li>{t('editor.tools.window')}</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">阶段 / Phases</h2>
        <ul className="list-disc list-inside">
          <li>{t('editor.phases.site')}</li>
          <li>{t('editor.phases.structure')}</li>
          <li>{t('editor.phases.furnish')}</li>
        </ul>
      </div>

      <div className="flex gap-2">
        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">
          {t('common.save')}
        </button>
        <button type="button" className="px-4 py-2 bg-gray-300 rounded">
          {t('common.cancel')}
        </button>
      </div>
    </div>
  )
}
