'use client'

import { Editor } from '@pascal-app/editor'
import { LanguageSwitcher } from './components/language-switcher'

export default function Home() {
  return (
    <div className="h-screen w-screen relative">
      {/* Language Switcher - positioned at top right */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      <Editor />
    </div>
  )
}
