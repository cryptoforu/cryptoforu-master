import type { Metadata } from 'next'

const seo: Metadata = {
  title: {
    template: '%s | Cryptoforu',
    default: 'Cryptoforu',
  },
  description:
    'Cryptoforu is a community where you can learn, earn, and share your knowledge of cryptocurrency. Get the most recent crypto news and start building your crypto portfolio',
  applicationName: 'Cryptoforu',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_HOST}`),
  alternates: {
    canonical: '/',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_URL,
    title: 'Cryptoforu | Learn and Earn Crypto',
    description: 'Learn and Earn Crypto',
    siteName: 'Cryptoforu',
    images: [
      {
        url: '/og_cryptoforu.jpg',
      },
    ],
  },
  manifest: '/site.webmanifest.json',
  twitter: {
    card: 'summary_large_image',
    creator: '@CryptoforuEarn',
    title: 'Cryptoforu | Learn and Earn Crypto',
    description: 'Learn and Earn Crypto',
    images: [
      {
        url: '/og_cryptoforu.jpg',
      },
    ],
  },
}
export default seo
