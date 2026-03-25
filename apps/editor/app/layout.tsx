import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Barlow } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pascal Editor',
  description: 'Standalone building editor',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html className={`${geistSans.variable} ${geistMono.variable} ${barlow.variable}`} lang={locale}>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <>
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
              strategy="beforeInteractive"
            />
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
          </>
        )}
      </head>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
