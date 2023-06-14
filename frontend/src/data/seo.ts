import type { Metadata } from 'next'

const seo: Metadata = {
  title: {
    template: '%s | Cryptoforu',
    default: 'Cryptoforu',
  },
  description:
    'If you are interested in making money online, then Cryptoforu is the right place for you. We help individuals to learn and earn crypto by providing them with the knowledge they need to succeed',
  applicationName: 'Cryptoforu',
  metadataBase: new URL(`${process.env.HOST}`),
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
    url: process.env.HOST,
    title: 'Cryptoforu | Learn and Earn Crypto',
    description: 'Learn and Earn Crypto',
    siteName: 'Cryptoforu',
    images: [
      {
        url: '/logo_gr.png',
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
        url: '/logo_gr.png',
      },
    ],
  },
}
export default seo
