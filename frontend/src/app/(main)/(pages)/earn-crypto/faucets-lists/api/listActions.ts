'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function updateSize(size: string) {
  try {
    cookies().set('listSize', size)
    revalidateTag('faucetList')
    return { message: 'Success!' }
  } catch (e) {
    return { message: 'Something Went Wrong' }
  }
}

export async function updatePage(page: string) {
  try {
    cookies().set('pageNumber', page)
    revalidateTag('faucetList')
    return { message: 'Success!' }
  } catch (e) {
    return { message: 'Something Went Wrong' }
  }
}
