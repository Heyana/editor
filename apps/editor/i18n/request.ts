import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export const locales = ['en', 'zh'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async () => {
  // 从 cookie 读取语言设置，默认中文
  const cookieStore = await cookies()
  const locale = (cookieStore.get('locale')?.value as Locale) || 'zh'

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
