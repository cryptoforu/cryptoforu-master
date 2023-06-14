import { Orbitron, Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'

export const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

export const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
})

export const detacher = localFont({
  src: './detacher.woff2',
  display: 'swap',
})
