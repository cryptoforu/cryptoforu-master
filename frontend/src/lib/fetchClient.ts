import { getApiUrl } from '@/lib/getApiUrl'

export async function fetchData(
  url: URL | RequestInfo,
  init?: RequestInit | undefined
) {
  const request = new Request(`${getApiUrl()}${url}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_ADMIN_TOKEN}`,
    },
    mode: 'cors',
    ...init,
  })
  return fetch(request)
}
