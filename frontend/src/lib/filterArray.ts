interface FilterObject {
  [key: string]: any[]
}

export function filterArrayByIndices<T>(
  arr: T[],
  filterObj: FilterObject
): T[] {
  return arr.filter((item) => {
    for (const key in filterObj) {
      if (!filterObj[key].includes(item[key])) {
        return false
      }
    }
    return true
  })
}
