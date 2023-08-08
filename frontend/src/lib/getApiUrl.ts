export const getBaseUrl = () =>
  process.env.CRYPTOFORU_URL
    ? `https://cryptoforu.net/`
    : process.env.NEXT_PUBLIC_HOST

export const getApiUrl = () =>
  process.env.CRYPTOFORU_API_URL
    ? `https://cryptoforu.net/api`
    : process.env.NEXT_PUBLIC_BACKEND_URL

export const getImageUrl = () =>
  process.env.CRYPTOFORU_API_IMAGE_URL
    ? `https://cryptoforu.net/api/img/cache/original/`
    : process.env.NEXT_PUBLIC_IMG_URL
