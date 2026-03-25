'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
      window.location.reload()
    })
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => switchLanguage('zh')}
        disabled={isPending || locale === 'zh'}
        className={`px-3 py-1 rounded ${
          locale === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => switchLanguage('en')}
        disabled={isPending || locale === 'en'}
        className={`px-3 py-1 rounded ${
          locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  )
}
