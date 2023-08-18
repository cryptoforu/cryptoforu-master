import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'

const space = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

const detacher = localFont({
  src: './detacher.woff2',
  display: 'swap',
})

export { detacher, space }
