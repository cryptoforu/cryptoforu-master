export function getRandomStringFromArray<T extends string>(strings: T[]): T {
  const randomIndex = Math.floor(Math.random() * strings.length)
  return strings[randomIndex]
}

export function randomBadge() {
  return getRandomStringFromArray(['primary', 'secondary', 'teal', 'cyan'])
}
